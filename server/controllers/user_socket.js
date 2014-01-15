if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    '../utils/tools_socket'
], function (tools) {
    'use strict';

    return {
        isConnected: function(req){
            if(tools.isConnected(req) !== false)
                req.io.respond(true);
            else
                req.io.respond(false);
        }
    };
});