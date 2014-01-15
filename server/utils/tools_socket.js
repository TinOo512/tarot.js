if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
], function () {
    'use strict';

    var Tools = {

        isConnected: function(req) {
            if(req.session._id) return req.session._id;
            else return false;
        }

    };
    return Tools;
});