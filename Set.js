var LinkList = require('./LinkList'),
    inherit = require('./utils').inherit;

var Set = inherit(LinkList, {
    join: function (data) {
        var prev = this.tail();

        if (this.isMember(data)) {
            return -1;
        }

        return this.insert(data, prev);
    },

    quit: function (data) {
        var prev;

        if (!this.isMember(data)) {
            return null;
        }

        this.each(function (node) {
            if (this.data(node) === data) {
                return false;
            }

            prev = node;
        });

        return this.remove(prev);
    },

    isMember: function (data) {
        var ret = false;

        this.each(function (node) {
            if (this.data(node) === data) {
                ret = true;
            }
        });

        return ret;
    },

    isSubset: function (set) {
        var ret = true;

        if (this.size() > set.size()) {
            return false;
        }

        this.each(function (node) {
            if (!set.isMember(this.data(node))) {
                ret = false;
            }
        });

        return ret;
    },

    isEqual: function (set) {
        if (this.size() !== set.size()) {
            return false;
        }

        return this.isSubset(set);
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