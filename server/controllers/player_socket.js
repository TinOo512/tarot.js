if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    '../lib/mongoose'
], function (mongoose) {
    'use strict';

    var Socket = {
        addPlayerAction: function(req) {
        },

        getPlayerAction: function(req) {
            var User = mongoose.models.user;

            User.findById(req.session._id, 'player', function (err, res) {
                // si le model n'est pas null
                if (res) {
                    req.io.respond({success: true, player: res.player.toObject()});
                } else {
                    req.io.respond({success: false});
                }
            });
        }
    };
    return Socket;
});