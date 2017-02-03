module.exports = sort;

function sort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    var mid = (arr.length / 2) >> 0,
        larr = sort(arr.slice(0, mid)),
        rarr = sort(arr.slice(mid, arr.length)),

        res = [];

    while (larr.length && rarr.length) {
        if (larr[0] < rarr[0]) {
            res.push(larr[0]);
        } else {
            res.push(rarr[0]);
        }
    }

    if (larr.length) {
        res = res.concat(larr);
    } else if (rarr.length) {
        res = res.concat(rarr);
    }

    return res;
}