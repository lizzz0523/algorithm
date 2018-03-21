var LinkList = require('./LinkList'),
    extend = require('./utils').extend;

function CHashTable(buckets, hash, match) {
    this._hash = hash;
    this._match = match;
    this._table = Array.apply(null, { length: buckets });
    
    this.initial.apply(this, arguments);
}

extend(CHashTable.prototype, {
    initial: function () {

    },
    destroy: function () {

    },
    insert: function () {

    },
    remove: function () {

    },
    lookup: function () {

    },
    size: function () {

    },
    data: function () {

    }
});

module.exports = CHashTable;