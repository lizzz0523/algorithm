"use strict";
exports.__esModule = true;
var LinkedNode = /** @class */ (function () {
    function LinkedNode(data) {
        this.data = data;
        this.prev = this;
        this.next = this;
    }
    LinkedNode.prototype.toString = function () {
        return "" + this.data;
    };
    return LinkedNode;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.size_ = 0;
        this.head_ = new LinkedNode(null);
    }
    LinkedList.prototype.toString = function () {
        var node = this.head_.next;
        var paths = [];
        while (node !== this.head_) {
            paths.push("" + node);
            node = node.next;
        }
        return paths.join('->');
    };
    LinkedList.prototype.isEmpty = function () {
        return this.size_ === 0;
    };
    LinkedList.prototype.size = function () {
        return this.size_;
    };
    LinkedList.prototype.contains = function (data) {
        return this.find_(data) !== this.head_;
    };
    LinkedList.prototype.clear = function () {
        while (this.head_.next !== this.head_) {
            this.remove_(this.head_.next);
        }
    };
    LinkedList.prototype.front = function () {
        if (this.isEmpty())
            return null;
        return this.head_.next.data;
    };
    LinkedList.prototype.back = function () {
        if (this.isEmpty())
            return null;
        return this.head_.prev.data;
    };
    LinkedList.prototype.pushFront = function (data) {
        return this.insert_(data, this.head_);
    };
    LinkedList.prototype.popFront = function () {
        if (this.isEmpty())
            return null;
        return this.remove_(this.head_.next);
    };
    LinkedList.prototype.pushBack = function (data) {
        return this.insert_(data, this.head_.prev);
    };
    LinkedList.prototype.popBack = function () {
        if (this.isEmpty())
            return null;
        return this.remove_(this.head_.prev);
    };
    LinkedList.prototype.insert_ = function (data, prev) {
        var next = prev.next;
        var node = new LinkedNode(data);
        node.prev = prev;
        node.next = next;
        prev.next = node;
        next.prev = node;
        this.size_++;
    };
    LinkedList.prototype.remove_ = function (node) {
        var data = node.data;
        var prev = node.prev;
        var next = node.next;
        prev.next = next;
        next.prev = prev;
        this.size_--;
        return data;
    };
    LinkedList.prototype.find_ = function (data) {
        var node = this.head_.next;
        while (node !== this.head_ && node.data !== data) {
            node = node.next;
        }
        return node;
    };
    return LinkedList;
}());
var list = new LinkedList();
list.pushFront(1);
list.pushFront(2);
list.pushFront(3);
list.pushFront(4);
console.log(list.size());
console.log(list.isEmpty());
console.log(list.front());
console.log(list.back());
console.log(list + '');
list.popFront();
console.log(list + '');
list.popFront();
console.log(list + '');
list.pushBack(4);
list.pushBack(3);
console.log(list + '');
list.popBack();
console.log(list + '');
list.popBack();
console.log(list + '');
list.popBack();
console.log(list + '');
list.popBack();
console.log(list + '');
console.log(list.size());
console.log(list.isEmpty());
