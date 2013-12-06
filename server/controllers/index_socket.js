if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
], function () {
    var Socket = {
        indexAction: function(req) {
            console.log("Hello World!");
        }
    };
    return Socket;
});