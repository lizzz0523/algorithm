namespace llc {

type cursor = number

const cursorSpace: LinkedNode<any>[] = []
const maxLength = 10

function initCursorSpace(): void {
    for (let i = 0; i < maxLength; i++) {
        cursorSpace[i] = new LinkedNode()
        cursorSpace[i].next = (i + 1) % maxLength
    }
}

function printCursorSpace(): void {
    console.log('slot\tdata\tnext\tprev')

    for (let i = 0; i < maxLength; i++) {
        console.log(`${ i }\t${ cursorSpace[i] }`)
    }
}

// cursorSpace[0]实际指着的是freelist
// 任何分配，都是从freelist中分配
// 释放，也是把linkednode放回freelist中

function allocCursor(): cursor {
    const p = cursorSpace[0].next

    if (!p) {
        return p
    }

    cursorSpace[0].next = cursorSpace[p].next
    cursorSpace[p].next = 0

    return p
}

function freeCursor(p: cursor): void {
    cursorSpace[p].next = cursorSpace[0].next
    cursorSpace[0].next = p
}

function $<T>(p: cursor): LinkedNode<T> {
    return cursorSpace[p]
}

class LinkedNode<T> {
    prev: cursor = 0
    next: cursor = 0
    data: T | null = null

    toString(): string {
        return `${ this.data }\t${ this.next }\t${ this.prev }`
    }
}

class LinkedList<T> {
    private head_: cursor
    private tail_: cursor

    constructor() {
        let head = allocCursor()
        let tail = allocCursor()

        if (!head || !tail) {
            throw Error('out of space')
        }

        $<T>(head).data = null
        $<T>(head).next = tail
        $<T>(head).prev = 0

        $<T>(tail).data = null
        $<T>(tail).next = 0
        $<T>(tail).prev = head

        this.head_ = head
        this.tail_ = tail
    }
    
    empty(): boolean {
        return $<T>(this.head_).next === this.tail_
    }

    find(data: T): cursor {
        let node = $<T>(this.head_).next

        while (node !== this.tail_ && $<T>(node).data !== data) {
            node = $<T>(node).next
        }
        
        return node
    }
    
    private remove_(node: cursor): T | null {
        if (node === this.tail_ && node === this.head_) {
            throw Error('no data')
        }
        
        let prev = $<T>(node).prev
        let next = $<T>(node).next

        $<T>(prev).next = next
        $<T>(next).prev = prev

        const data = $<T>(node).data
        $<T>(node).next = 0
        $<T>(node).prev = 0
        $<T>(node).data = null
        freeCursor(node)

        return data
    }

    private insert_(data: T, prev: cursor, next: cursor): void {
        const node = allocCursor()

        if (!node) {
            throw Error('out of space')
        }
        
        $<T>(next).prev = node
        $<T>(prev).next = node

        $<T>(node).next = next
        $<T>(node).prev = prev
        $<T>(node).data = data
    }

    private removeAfter_(prev: cursor): T | null {
        const node = $(prev).next
        return this.remove_(node)
    }

    private removeBefore_(next: cursor): T | null {
        const node = $(next).prev
        return this.remove_(node)
    }

    private insertAfter_(data: T, prev: cursor): void {
        const next = $<T>(prev).next
        return this.insert_(data, prev, next)
    }

    private insertBefore_(data: T, next: cursor): void {
        const prev = $<T>(next).prev
        return this.insert_(data, prev, next)
    }

    unshift(data: T): void {
        return this.insertAfter_(data, this.head_)
    }

    shift(): T | null {
        return this.removeAfter_(this.head_)
    }

    push(data: T): void {
        return this.insertBefore_(data, this.tail_)
    }

    pop(): T | null {
        return this.removeBefore_(this.tail_)
    }
}

initCursorSpace()
printCursorSpace()

const list = new LinkedList<number>()

list.push(10)
list.push(30)
list.push(100)
list.unshift(500)
printCursorSpace()

list.pop()
printCursorSpace()

list.pop()
printCursorSpace()

list.pop()
printCursorSpace()

list.pop()
printCursorSpace()

}