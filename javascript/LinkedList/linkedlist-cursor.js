"use strict";
exports.__esModule = true;
var LinkedNode = /** @class */ (function () {
    function LinkedNode() {
        this.prev = 0;
        this.next = 0;
        this.data = null;
    }
    LinkedNode.prototype.toString = function () {
        return "" + this.data;
    };
    return LinkedNode;
}());
var cursorSpace = [];
var maxLength = 10;
function initCursorSpace() {
    for (var i = 0; i < maxLength; i++) {
        cursorSpace[i] = new LinkedNode();
        cursorSpace[i].next = (i + 1) % maxLength;
    }
}
function printCursorSpace() {
    console.log('slot\tdata\tnext\tprev');
    for (var i = 0; i < maxLength; i++) {
        var node = cursorSpace[i];
        console.log(i + "\t" + node.data + "\t" + node.next + "\t" + node.prev);
    }
}
// cursorSpace[0]实际指着的是freelist
// 任何分配，都是从freelist中分配
// 释放，也是把linkednode放回freelist中
function allocCursor() {
    var p = cursorSpace[0].next;
    if (!p) {
        return p;
    }
    cursorSpace[0].next = cursorSpace[p].next;
    cursorSpace[p].next = 0;
    return p;
}
function freeCursor(p) {
    cursorSpace[p].next = cursorSpace[0].next;
    cursorSpace[0].next = p;
}
function $(p) {
    return cursorSpace[p];
}
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        var head = allocCursor();
        if (!head) {
            throw Error('out of space');
        }
        $(head).next = head;
        $(head).prev = head;
        this.size_ = 0;
        this.head_ = head;
    }
    LinkedList.prototype.toString = function () {
        var node = $(this.head_).next;
        var paths = [];
        while (node !== this.head_) {
            paths.push("" + $(node));
            node = $(node).next;
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
        var node = this.find_(data);
        return node === this.head_;
    };
    LinkedList.prototype.clear = function () {
        while ($(this.head_).next !== this.head_) {
            this.remove_($(this.head_).next);
        }
    };
    LinkedList.prototype.front = function () {
        if (this.isEmpty())
            return null;
        return $($(this.head_).next).data;
    };
    LinkedList.prototype.back = function () {
        if (this.isEmpty())
            return null;
        return $($(this.head_).prev).data;
    };
    LinkedList.prototype.pushFront = function (data) {
        return this.insert_(data, this.head_);
    };
    LinkedList.prototype.popFront = function () {
        if (this.isEmpty())
            return null;
        return this.remove_($(this.head_).next);
    };
    LinkedList.prototype.pushBack = function (data) {
        return this.insert_(data, $(this.head_).prev);
    };
    LinkedList.prototype.popBack = function () {
        if (this.isEmpty())
            return null;
        return this.remove_($(this.head_).prev);
    };
    LinkedList.prototype.insert_ = function (data, prev) {
        var next = $(prev).next;
        var node = allocCursor();
        if (!node) {
            throw Error('out of space');
        }
        $(node).data = data;
        $(node).prev = prev;
        $(node).next = next;
        $(prev).next = node;
        $(next).prev = node;
        this.size_++;
    };
    LinkedList.prototype.remove_ = function (node) {
        var data = $(node).data;
        var prev = $(node).prev;
        var next = $(node).next;
        $(prev).next = next;
        $(next).prev = prev;
        freeCursor(node);
        this.size_--;
        return data;
    };
    LinkedList.prototype.find_ = function (data) {
        var node = $(this.head_).next;
        while (node !== this.head_ && $(node).data !== data) {
            node = $(node).next;
        }
        return node;
    };
    return LinkedList;
}());
initCursorSpace();
printCursorSpace();
var list = new LinkedList();
debugger;
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
