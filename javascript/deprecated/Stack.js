var LinkList = require('./LinkList'),
    inherit = require('./utils').inherit;

var Stack = inherit(LinkList, {
    push: function (data) {
        return this.insert(data);
    },

    pop: function () {
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

module.exports = Stack;