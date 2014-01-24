if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    '../utils/tools_socket',
    '../lib/mongoose'
], function (tools,mongoose) {
    'use strict';

    return {
        isConnected: function(req){
            if(tools.isConnected(req) !== false)
                req.io.respond(true);
            else
                req.io.respond(false);
        },

        submitLogin: function(req){
            var User = mongoose.models.user;
            var player = req.data.player;
            User.findOne({player: player}, function (err, res) {
                // si le model est null
                console.log(err)
                if (res) {
                    console.log('res ---> ', res);
                    req.session.user = res.toObject();
                    console.log('toObject ---> ', res.toObject());
                    if(req.session.save()) {
                        return req.io.respond(true);
                    }
                }
                return req.io.respond(false);
            });
        }
    };
});