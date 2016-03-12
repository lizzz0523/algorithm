var LinkList = require('./LinkList'),
    inherit = require('./utils').inherit;

var Queue = inherit(LinkList, {
    enqueue: function (data) {
        return this.insert(data, this.tail());
    },

    dequeue: function () {
        return this.remove();
    },

    peek: function () {
        var node = this.head();

        if (node === null) {
            return null;
        } else {
            return this.data(node);
        }
    }
});

module.exports = Queue;