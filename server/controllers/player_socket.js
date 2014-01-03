if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    '../lib/mongoose'
], function (mongoose) {
    'use strict';

    var Socket = {
        addPlayerAction: function(req) {
            var Player = mongoose.models.player;

            var player = new Player(req.data.player);
            player.save();
        }
    };
    return Socket;
});