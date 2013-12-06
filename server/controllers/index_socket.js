if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
(function (define) {
    define([
        ''
    ], function () {
        var Socket = {
        };
        return Socket;
    });
})(typeof define != "undefined" ? define : function () {
    var result = arguments[arguments.length - 1]();
    if ("undefined" != typeof(result)) {
        module.exports = result;
    }
});