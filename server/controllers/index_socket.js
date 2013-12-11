if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
], function () {
    var Socket = {
        indexAction: function(req) {
            console.log(req.data);
        }
    };
    return Socket;
});