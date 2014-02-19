if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    '../utils/tools_socket',
    '../lib/mongoose'
], function (tools, mongoose) {
    'use strict';

    return {
        isConnected: function(req){
            if(tools.isConnected(req) !== false)
                req.io.respond(true);
            else
                req.io.respond(false);
        },

        submitLogin: function(req){
            var Tarot = mongoose.models.tarot;
            var user = req.data.user;

            var res = Tarot.findUserByName(user, true);
            // si l'username et le password match
            if (res._id) {
                req.session._id = res._id;
                req.session.user = res.user;
                if(req.session.save())
                    return req.io.respond(true);
            }
            return req.io.respond(false);
        }
    };
});