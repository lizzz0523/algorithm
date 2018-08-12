var lln;
(function (lln) {
    var LinkedNode = /** @class */ (function () {
        function LinkedNode() {
            this.prev = null;
            this.next = null;
            this.data = null;
        }
        LinkedNode.prototype.toString = function () {
            return this.data + "\t" + this.next + "\t" + this.prev;
        };
        return LinkedNode;
    }());
    var LinkedList = /** @class */ (function () {
        function LinkedList() {
            this.head_ = new LinkedNode();
            this.tail_ = new LinkedNode();
            this.head_.next = this.tail_;
            this.tail_.prev = this.head_;
        }
        LinkedList.prototype.empty = function () {
            return this.head_.next === this.tail_;
        };
        LinkedList.prototype.find = function (data) {
            var node = this.head_.next;
            while (node && node !== this.tail_ && node.data !== data) {
                node = node.next;
            }
            return node === this.tail_ ? null : node;
        };
        LinkedList.prototype.remove_ = function (node) {
            if (node === this.tail_ && node === this.head_) {
                throw Error('no data');
            }
            var prev = node.prev;
            var next = node.next;
            if (prev)
                prev.next = next;
            if (next)
                next.prev = prev;
            var data = node.data;
            node.data = null;
            node.prev = null;
            node.next = null;
            return data;
        };
        LinkedList.prototype.insert_ = function (data, prev, next) {
            var node = new LinkedNode();
            next.prev = node;
            prev.next = node;
            node.prev = prev;
            node.next = next;
            node.data = data;
        };
        LinkedList.prototype.removeAfter_ = function (prev) {
            var node = prev.next;
            if (!node)
                return null;
            return this.remove_(node);
        };
        LinkedList.prototype.removeBefore_ = function (next) {
            var node = next.prev;
            if (!node)
                return null;
            return this.remove_(node);
        };
        LinkedList.prototype.insertBefore_ = function (data, prev) {
            var next = prev.next;
            if (!next)
                return;
            return this.insert_(data, prev, next);
        };
        LinkedList.prototype.insertAfter_ = function (data, next) {
            var prev = next.prev;
            if (!prev)
                return;
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
})(lln || (lln = {}));
