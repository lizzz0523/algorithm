namespace lln {

class LinkedNode<T> {
    prev: LinkedNode<T> | null = null
    next: LinkedNode<T> | null = null
    data: T | null = null

    toString(): string {
        return `${ this.data }\t${ this.next }\t${ this.prev }`
    }
}

class LinkedList<T> {
    private head_: LinkedNode<T>
    private tail_: LinkedNode<T>

    constructor() {
        this.head_ = new LinkedNode<T>()
        this.tail_ = new LinkedNode<T>()

        this.head_.next = this.tail_
        this.tail_.prev = this.head_
    }

    empty() {
        return this.head_.next === this.tail_
    }

    find(data: T): LinkedNode<T> | null {
        let node = this.head_.next

        while (node && node !== this.tail_ && node.data !== data) {
            node = node.next
        }

        return node === this.tail_ ? null : node
    }

    private remove_(node: LinkedNode<T>): T | null {
        if (node === this.tail_ && node === this.head_) {
            throw Error('no data')
        }
        
        const prev = node.prev
        const next = node.next

        if (prev) prev.next = next
        if (next) next.prev = prev

        const data = node.data
        node.data = null
        node.prev = null
        node.next = null

        return data
    }

    private insert_(data: T, prev: LinkedNode<T>, next: LinkedNode<T>): void {
        const node = new LinkedNode<T>()

        next.prev = node
        prev.next = node

        node.prev = prev
        node.next = next
        node.data = data
    }

    private removeAfter_(prev: LinkedNode<T>): T | null {
        const node = prev.next
        if (!node) return null
        return this.remove_(node)
    }

    private removeBefore_(next: LinkedNode<T>): T | null {
        const node = next.prev
        if (!node) return null
        return this.remove_(node)
    }

    private insertBefore_(data: T, prev: LinkedNode<T>) {
        const next = prev.next
        if (!next) return
        return this.insert_(data, prev, next)
    }

    private insertAfter_(data: T, next: LinkedNode<T>) {
        const prev = next.prev
        if (!prev) return
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

}