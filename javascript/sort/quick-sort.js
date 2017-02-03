module.exports = sort;

function join() {
    var res = [],
        args = [].slice.call(arguments, 0),
        len = args.length;
        i = -1;

    while (++i < len) {
        res = res.concat(args[i]);
    }

    return res;
}

function sort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    var marr = arr.splice((Math.random() * arr.length) >> 0, 1),
        larr = [],
        rarr = [],
        len = arr.length,
        i = -1;

    while (++i < len) {
        if (arr[i] < marr[0]) {
            larr.push(arr[i]);
        } else if (arr[i] > marr[0]) {
            rarr.push(arr[i]);
        }
    }

    return join(sort(larr), marr, sort(rarr));
}