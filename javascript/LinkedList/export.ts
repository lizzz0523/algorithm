export interface ILinkedList<T> {
    isEmpty(): boolean
    size(): number
    contains(data: T): boolean
    clear(): void
    front(): T | null
    back(): T | null
    pushFront(data: T): void
    popFront(): T | null
    pushBack(data: T): void
    popBack(): T | null
}