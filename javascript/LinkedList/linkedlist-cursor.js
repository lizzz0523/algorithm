var llc;
(function (llc) {
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
            console.log(i + "\t" + cursorSpace[i]);
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
    var LinkedNode = /** @class */ (function () {
        function LinkedNode() {
            this.prev = 0;
            this.next = 0;
            this.data = null;
        }
        LinkedNode.prototype.toString = function () {
            return this.data + "\t" + this.next + "\t" + this.prev;
        };
        return LinkedNode;
    }());
    var LinkedList = /** @class */ (function () {
        function LinkedList() {
            var head = allocCursor();
            var tail = allocCursor();
            if (!head || !tail) {
                throw Error('out of space');
            }
            $(head).data = null;
            $(head).next = tail;
            $(head).prev = 0;
            $(tail).data = null;
            $(tail).next = 0;
            $(tail).prev = head;
            this.head_ = head;
            this.tail_ = tail;
        }
        LinkedList.prototype.empty = function () {
            return $(this.head_).next === this.tail_;
        };
        LinkedList.prototype.find = function (data) {
            var node = $(this.head_).next;
            while (node !== this.tail_ && $(node).data !== data) {
                node = $(node).next;
            }
            return node;
        };
        LinkedList.prototype.remove_ = function (node) {
            if (node === this.tail_ && node === this.head_) {
                throw Error('no data');
            }
            var prev = $(node).prev;
            var next = $(node).next;
            $(prev).next = next;
            $(next).prev = prev;
            var data = $(node).data;
            $(node).next = 0;
            $(node).prev = 0;
            $(node).data = null;
            freeCursor(node);
            return data;
        };
        LinkedList.prototype.insert_ = function (data, prev, next) {
            var node = allocCursor();
            if (!node) {
                throw Error('out of space');
            }
            $(next).prev = node;
            $(prev).next = node;
            $(node).next = next;
            $(node).prev = prev;
            $(node).data = data;
        };
        LinkedList.prototype.removeAfter_ = function (prev) {
            var node = $(prev).next;
            return this.remove_(node);
        };
        LinkedList.prototype.removeBefore_ = function (next) {
            var node = $(next).prev;
            return this.remove_(node);
        };
        LinkedList.prototype.insertAfter_ = function (data, prev) {
            var next = $(prev).next;
            return this.insert_(data, prev, next);
        };
        LinkedList.prototype.insertBefore_ = function (data, next) {
            var prev = $(next).prev;
            return this.insert_(data, prev, next);
        };
        LinkedList.prototype.unshift = function (data) {
            return this.insertAfter_(data, this.head_);
        };
        LinkedList.prototype.shift = function () {
            return this.removeAfter_(this.head_);
        };
        LinkedList.prototype.push = function (data) {
            return this.insertBefore_(data, this.tail_);
        };
        LinkedList.prototype.pop = function () {
            return this.removeBefore_(this.tail_);
        };
        return LinkedList;
    }());
    initCursorSpace();
    printCursorSpace();
    var list = new LinkedList();
    list.push(10);
    list.push(30);
    list.push(100);
    list.unshift(500);
    printCursorSpace();
    list.pop();
    printCursorSpace();
    list.pop();
    printCursorSpace();
    list.pop();
    printCursorSpace();
    list.pop();
    printCursorSpace();
})(llc || (llc = {}));
