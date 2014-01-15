if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    '../lib/mongoose'
], function (mongoose) {
    'use strict';

    function pushGuestPlayers(res, guestPlayers) {
        for (var i=0 ; i<guestPlayers.length ; i++) {
            // on insert le guestPlayers si celui-ci n'existe pas deja
            if (!res.hasGuestPlayer(guestPlayers[i])) {
                res.guestPlayers.push(guestPlayers[i]);
            }
        }

        pushGame(res, guestPlayers)
    }

    function pushGame(res, guestPlayers) {
        //todo: opti, ajouter le status dans la request et check le length
        if (!res.getUnfinishedGame()) {
            var game = {};
            game.guestPlayers = guestPlayers;
            game.status = true;
            res.games.push(game);

            res.save();
        } else {
            //todo: go to unfinished game!
        }
    }

    var Socket = {
        addGameAction: function(req) {
            var User = mongoose.models.user;

            var player = req.data.player;
            var guestPlayers = req.data.game.guestPlayers;

            User.findOne({player: player}, function (err, res) {
                // si le model est null
                if (!res) {
                    // on insert un nouveau player
                    var user = new User()
                    user.player = player;
                    user.save(function (err, res, numberAffected) {
                        // si le player est bien insert
                        if (res) {
                            // on ajoute l'id en session
                            req.session._id = res._id;
                            req.session.save();

                            // on ajoute les guestPlayers
                            pushGuestPlayers(res, guestPlayers);
                        }
                    });
                // si le model n'est pas null
                } else {
                    // on ajoute l'id en session
                    req.session._id = res._id;
                    req.session.save();

                    // on ajoute les guestPlayers
                    pushGuestPlayers(res, guestPlayers);
                }
            });
        },

        getGameAction: function(req) {
            var User = mongoose.models.user;

            User.findById(req.session._id, function (err, res) {
                if (res) {
                    var game = {player: res.player.toObject(), game: res.getUnfinishedGame().toObject()}
                    req.io.respond(game);
                }
            });
        }
    };
    return Socket;
});