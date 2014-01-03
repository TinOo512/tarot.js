if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
], function () {
    'use strict';

    var Socket = {
        indexAction: function(req) {
            console.log(req.data);
        }
    };
    return Socket;
});