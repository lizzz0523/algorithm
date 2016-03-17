var LinkList = require('./LinkList'),
    inherit = require('./utils').inherit;

var Set = inherit(LinkList, {
    initial: function (match) {
        match = match || function (x, y) { return x === y };

        if (typeof match !== 'function') {
            throw Error('parameter match must be a function');
        }

        this._match = match;
    },

    join: function (data) {
        if (this.isMember(data)) {
            return -1;
        }

        return this.insert(data, this.tail());
    },

    quit: function (data) {
        var prev = null;

        this.each(function (node) {
            if (this._match(this.data(node), data)) {
                return false;
            }

            prev = node;
        });

        if (prev !== null) {
            return this.remove(prev);
        } else {
            return null;
        }
    },

    isMember: function (data) {
        var exist = false;

        this.each(function (node) {
            if (this._match(this.data(node), data)) {
                exist = true;
                return false;
            }
        });

        return exist;
    },

    isSubset: function (set) {
        var exist = true;

        if (this.size() > set.size()) {
            return false;
        }

        this.each(function (node) {
            if (!set.isMember(this.data(node))) {
                exist = false;
                return false;
            }
        });

        return exist;
    },

    isEqual: function (set) {
        var exist = true;

        if (this.size() !== set.size()) {
            return false;
        }

        this.each(function (node) {
            if (!set.isMember(this.data(node))) {
                exist = false;
                return false;
            }
        });

        return exist;
    }
}, {
    union: function (set1, set2) {
        var setu = new Set();

        set1.each(function (node) {
            setu.insert(set1.data(node), setu.tail());
        });

        set2.each(function (node) {
            if (set1.isMember(set2.data(node))) {
                return;
            }

            setu.insert(set2.data(node), setu.tail());
        });

        return setu;
    },

    intersection: function (set1, set2) {
        var seti = new Set();

        set1.each(function (node) {
            if (set2.isMember(set1.data(node))) {
                seti.insert(set1.data(node), seti.tail());
            }
        });

        return seti;
    },

    difference: function (set1, set2) {
        var setd = new Set();

        set1.each(function (node) {
            if (!set2.isMember(set1.data(node))) {
                setd.insert(set1.data(node), setd.tail());
            }
        });

        return setd;
    }
});

module.exports = Set;