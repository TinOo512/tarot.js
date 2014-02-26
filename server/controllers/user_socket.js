if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    '../utils/tools_socket',
    '../lib/mongoose'
], function (tools, mongoose) {
    'use strict';

    return {
        isLoggedAction: function(req){
            if(tools.isLogged(req) !== false)
                req.io.respond(true);
            else
                req.io.respond(false);
        },

        submitLoginAction: function(req){
            var Tarot = mongoose.models.tarot;
            var user = req.data.user;

            Tarot.findUserByName(user, false, function(res) {
                // si l'username et le password match
                if (res) {
                    req.session._id = res._id;

                    // si l'user a une game non fini on save son id en session
                    var unfinishedGame = res.getUnfinishedGame();
                    if (unfinishedGame) {
                        req.session.game_id = unfinishedGame._id;
                    }

                    req.session.save();
                    return req.io.respond(true);
                }
                return req.io.respond(false);
            });
        },

        getUserAction: function(req) {
            var Tarot = mongoose.models.tarot;

            Tarot.findById(req.session._id, 'user', { lean: true }, function (err, res) {
                if (err) throw new Error("Mongoose - "+err.message);
                // si le model n'est pas null
                if (res) {
                    req.io.respond({success: true, user: res.user});
                } else {
                    req.io.respond({success: false});
                }
            });
        }
    };
});