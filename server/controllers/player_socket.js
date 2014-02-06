if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    '../lib/mongoose'
], function (mongoose) {
    'use strict';

    //todo: rename file with user!
    var Socket = {
        addUserAction: function(req) {
        },

        getUserAction: function(req) {
            var Tarot = mongoose.models.tarot;

            Tarot.findById(req.session._id, 'user', function (err, res) {
                if (err) throw new Error("Mongoose - "+err.message);
                // si le model n'est pas null
                if (res) {
                    req.io.respond({success: true, user: res.user.toObject()});
                } else {
                    req.io.respond({success: false});
                }
            });
        }
    };
    return Socket;
});