var LinkNode = require('./LinkNode'),
    extend = require('./utils').extend;

function LinkList() {
    this.init();
}

extend(LinkList.prototype, {
    // 初始化链表
    init: function () {
        this._size = 0;
        this._head = null;
        this._tail = null;
    },

    // 销毁链表
    destroy: function () {
        while (this._size > 0) {
            this.remove();
        }
    },

    insert: function (data, prev) {
        var node = new LinkNode(data);

        // 如果没有指定prev，则插入到表头
        if (!prev) {    
            // 如果链表还没有任何元素
            if (this._size === 0) {
                this._tail = node;
            }

            node._next = this._head;
            this._head = node;
        } else {
            // 如果prev本身是表尾
            if (prev._next === null) {
                this._tail = node;
            }

            node._next = prev._next;
            prev._next = node;
        }

        // 增加size
        this._size++;

        return this._size;
    },

    remove: function (prev) {
        var node;

        // 如果链表还没有任何元素
        if (this._size === 0) {
            return null;
        }

        // 如果没有指定prev，则删除表头
        if (!prev) {
            node = this._head;
            this._head = node._next;

            // 如果链表只有一个元素
            if (this._size === 1) {
                this.tail = null;
            }
        } else {
            // 如果prev已经是表尾了
            if (prev._next === null) {
                return null;
            }

            node = prev._next;
            prev._next = node._next;

            // 如果prev的next是表尾
            if (prev._next === null) {
                this._tail = prev;
            }
        }

        // 减少size
        this._size--;

        return node._data;
    },

    each: function (callback) {
        var node;

        for (node = this.head(); node !== null; node = this.next(node)) {
            if (callback.call(this, node) === false) {
                break;
            }
        }
    },

    head: function () {
        return this._head;
    },

    tail: function () {
        return this._tail;
    },

    size: function () {
        return this._size;
    },

    data: function (node) {
        return node._data;
    },

    next: function (node) {
        return node._next;
    },

    isHead: function (node) {
        return this._head === node;
    },

    isTail: function (node) {
        return this._tail === node;
    },

    toString: function () {
        var ret = [];

        this.each(function (node) {
            ret.push(this.data(node));
        });

        return ret.join('->');
    }
});

module.exports = LinkList;