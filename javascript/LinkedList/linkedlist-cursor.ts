import { ILinkedList } from './export'

type cursor = number

class LinkedNode<T> {
    prev: cursor = 0
    next: cursor = 0
    data: T | null = null

    toString() {
        return `${ this.data }`
    }
}

const cursorSpace: LinkedNode<any>[] = []
const maxLength = 10

function initCursorSpace(): void {
    for (let i = 0; i < maxLength; i++) {
        cursorSpace[i] = new LinkedNode<any>()
        cursorSpace[i].next = (i + 1) % maxLength
    }
}

function printCursorSpace(): void {
    console.log('slot\tdata\tnext\tprev')

    for (let i = 0; i < maxLength; i++) {
        const node = cursorSpace[i]
        console.log(`${ i }\t${ node.data }\t${ node.next }\t${ node.prev }`)
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

class LinkedList<T> implements ILinkedList<T> {
    private size_: number
    private head_: cursor

    constructor() {
        let head = allocCursor()

        if (!head) {
            throw Error('out of space')
        }

        $<T>(head).next = head
        $<T>(head).prev = head

        this.size_ = 0
        this.head_ = head
    }

    toString() {
        let node = $<T>(this.head_).next
        let paths = []

        while (node !== this.head_) {
            paths.push(`${ $<T>(node) }`)
            node = $<T>(node).next
        }

        return paths.join('->')
    }
    
    isEmpty() {
        return this.size_ === 0
    }

    size() {
        return this.size_
    }

    contains(data: T) {
        const node = this.find_(data)
        return node === this.head_
    }

    clear() {
        while ($<T>(this.head_).next !== this.head_) {
            this.remove_($<T>(this.head_).next)
        }
    }

    front() {
        if (this.isEmpty())
            return null
        return $<T>($<T>(this.head_).next).data
    }

    back() {
        if (this.isEmpty())
            return null
        return $<T>($<T>(this.head_).prev).data
    }

    pushFront(data: T) {
        return this.insert_(data, this.head_)
    }

    popFront() {
        if (this.isEmpty())
            return null
        return this.remove_($<T>(this.head_).next)
    }

    pushBack(data: T) {
        return this.insert_(data, $<T>(this.head_).prev)
    }

    popBack() {
        if (this.isEmpty())
            return null
        return this.remove_($<T>(this.head_).prev)
    }

    private insert_(data: T, prev: cursor) {
        const next = $<T>(prev).next
        const node = allocCursor()

        if (!node) {
            throw Error('out of space')
        }

        $<T>(node).data = data
        $<T>(node).prev = prev
        $<T>(node).next = next
        $<T>(prev).next = node
        $<T>(next).prev = node

        this.size_++
    }

    private remove_(node: cursor) {
        const data = $<T>(node).data
        const prev = $<T>(node).prev
        const next = $<T>(node).next

        $<T>(prev).next = next
        $<T>(next).prev = prev

        freeCursor(node)

        this.size_--

        return data
    }

    private find_(data: T) {
        let node = $<T>(this.head_).next

        while (node !== this.head_ && $<T>(node).data !== data) {
            node = $<T>(node).next
        }

        return node
    }
}

initCursorSpace()
printCursorSpace()

const list = new LinkedList<number>()
debugger
list.pushFront(1)
list.pushFront(2)
list.pushFront(3)
list.pushFront(4)
console.log(list.size())
console.log(list.isEmpty())
console.log(list.front())
console.log(list.back())
console.log(list + '')
list.popFront()
console.log(list + '')
list.popFront()
console.log(list + '')
list.pushBack(4)
list.pushBack(3)
console.log(list + '')
list.popBack()
console.log(list + '')
list.popBack()
console.log(list + '')
list.popBack()
console.log(list + '')
list.popBack()
console.log(list + '')
console.log(list.size())
console.log(list.isEmpty())