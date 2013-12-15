if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    '../lib/mongoose'
], function (mongoose) {
    var Socket = {
        addUserAction: function(req) {
            var Player = mongoose.models.player;

            // on recupere uniquement le player 1
            var player = new Player(req.data.player);
            player.save();
        }
    };
    return Socket;
});