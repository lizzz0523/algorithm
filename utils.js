var _each = exports.each = function (obj, fn, ctx) {
    var keys,
        i,
        len;

    if (Array.isArray(obj)) {
        i = -1;
        len = obj.length;

        while (++i < len) {
            if (fn.call(ctx || obj[i], obj[i], i, obj) === false) {
                break;
            }
        }
    } else {
        keys = Object.keys(obj);
        i = -1;
        len = keys.length;

        while (++i < len) {
            if (fn.call(ctx || obj[keys[i]], obj[keys[i]], keys[i], obj) === false) {
                break;
            }
        }
    }
};

var _extend = exports.extend = function (dest) {
    var args = [].slice.call(arguments, 1);

    _each(args, function (src) {
        _each(src, function (value, key) {
            dest[key] = value;
        });
    });

    return dest;
}

exports.inherit = function (Parent, proto, static) {
    function Child() {
        Parent.call(this);
    }

    function Proxy() {}

    Proxy.prototype = Parent.prototype;
    Child.prototype = new Proxy();

    Proxy = null;

    _extend(Child.prototype, proto || {});
    _extend(Child, static || {});

    return Child;
};