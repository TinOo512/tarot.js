if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    '../lib/mongoose'
], function (mongoose) {

    function pushGuestPlayers(res, guestPlayers) {
        for (var i=0 ; i<guestPlayers.length ; i++) {
            //todo: ne pas push les guestPlayers qui existe deja!
            res.guest_players.push(guestPlayers[i]);
        }

        pushGame(res, guestPlayers)
    }

    function pushGame(res, guestPlayers) {
        var game = {};
        game.guest_players = guestPlayers;
        game.status = true;
        res.games.push(game);

        res.save();
    }

    var Socket = {
        addGameAction: function(req) {
            var Tarot = mongoose.models.tarot;

            var player = req.data.game.player;
            var guestPlayers = req.data.game.guestPlayers;

            Tarot.findOne({player: player}, function (err, res) {
                // si le model est null
                if (!res) {
                    // on insert un nouveau player
                    var tarot = new Tarot()
                    tarot.player = player;
                    tarot.save(function (err, res, numberAffected) {
                        // si le player est bien insert
                        if (res) {
                            // on ajoute l'id en session
                            req.session._id = res._id;

                            // on ajoute les guestPlayers
                            pushGuestPlayers(res, guestPlayers);
                        }
                    });
                // si le model n'est pas null
                } else {
                    // on ajoute l'id en session
                    req.session._id = res._id;

                    // on ajoute les guestPlayers
                    pushGuestPlayers(res, guestPlayers);
                }
            });
        },

        getGameAction: function(req) {
            var Game = mongoose.models.game;

            /*Game.findOne({ $and: [{'id_player': req.session.player._id}, {'status': true}] }, function (err, res) {
                debugger;
            });*/
        }
    };
    return Socket;
});