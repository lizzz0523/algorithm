import { ILinkedList } from './export'

class LinkedNode<T> {
    prev: LinkedNode<T>
    next: LinkedNode<T>
    data: T | null

    constructor(data: T | null) {
        this.data = data
        this.prev = this
        this.next = this
    }

    toString(): string {
        return `${ this.data }`
    }
}

class LinkedList<T> implements ILinkedList<T> {
    private size_: number
    private head_: LinkedNode<T>

    constructor() {
        this.size_ = 0
        this.head_ = new LinkedNode<T>(null)
    }

    toString() {
        let node = this.head_.next
        let paths = []

        while (node !== this.head_) {
            paths.push(`${ node }`)
            node = node.next
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
        return this.find_(data) !== this.head_
    }

    clear() {
        while (this.head_.next !== this.head_) {
            this.remove_(this.head_.next)
        }
    }

    front() {
        if (this.isEmpty())
            return null
        return this.head_.next.data
    }

    back() {
        if (this.isEmpty())
            return null
        return this.head_.prev.data
    }

    pushFront(data: T) {
        return this.insert_(data, this.head_)
    }

    popFront() {
        if (this.isEmpty())
            return null
        return this.remove_(this.head_.next)
    }

    pushBack(data: T) {
        return this.insert_(data, this.head_.prev)
    }

    popBack() {
        if (this.isEmpty())
            return null
        return this.remove_(this.head_.prev)
    }

    private insert_(data: T, prev: LinkedNode<T>) {
        const next = prev.next
        const node = new LinkedNode(data)

        node.prev = prev
        node.next = next
        prev.next = node
        next.prev = node

        this.size_++
    }

    private remove_(node: LinkedNode<T>) {
        const data = node.data
        const prev = node.prev
        const next = node.next

        prev.next = next
        next.prev = prev

        this.size_--

        return data
    }

    private find_(data: T) {
        let node = this.head_.next

        while (node !== this.head_ && node.data !== data) {
            node = node.next
        }

        return node
    }
}

const list = new LinkedList<number>()
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