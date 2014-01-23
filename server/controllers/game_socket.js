if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    '../lib/mongoose'
], function (mongoose) {
    'use strict';

    function pushGuestPlayers(req, res, guestPlayers) {
        for (var i=0 ; i<guestPlayers.length ; i++) {
            // on insert le guestPlayers si celui-ci n'existe pas deja
            if (!res.hasGuestPlayer(guestPlayers[i])) {
                res.guestPlayers.push(guestPlayers[i]);
            }
        }

        pushGame(req, res, guestPlayers)
    }

    function pushGame(req, res, guestPlayers) {
        //todo: opti, ajouter le status dans la request et check le length
        var unfinishedGame = res.getUnfinishedGame();
        if (!unfinishedGame) {
            var game = {};
            game.guestPlayers = guestPlayers;
            game.status = true;
            res.games.push(game);

            res.save(function (err, res, numberAffected) {
                // si la game est bien insert
                if (res) {
                    req.session.game_id = res.games[res.games.length-1]._id;
                    req.session.save();
                }
            });
        } else {
            req.session.game_id = unfinishedGame._id;
            req.session.save();
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

                            // on ajoute les guestPlayers
                            pushGuestPlayers(req, res, guestPlayers);
                        }
                    });
                // si le model n'est pas null
                } else {
                    // on ajoute l'id en session
                    req.session._id = res._id;

                    // on ajoute les guestPlayers
                    pushGuestPlayers(req, res, guestPlayers);
                }
            });
        },

        getGameAction: function(req) {
            var User = mongoose.models.user;

            User.findOne({'games._id': req.session.game_id}, 'games', function (err, res) {
                var response;
                // si le model n'est pas null
                if (res) {
                    response = {success: true, game: res.games[0].toObject()};
                } else {
                    response = {success: false};
                }
                req.io.respond(response);
            });
        },

        pushRoundAction: function (req) {
            var User = mongoose.models.user;

            User.findOne({'games._id': req.session.game_id}, 'games', function (err, res) {
                // si le model n'est pas null
                if (res) {
                    res.games[0].rounds.push(req.data.round);

                    res.save(function (err, res, numberAffected) {
                        // si la round est bien insert
                        if (res) {
                            req.io.respond({success: true});
                        } else {
                            req.io.respond({success: false});
                        }
                    });
                }
            });
        }
    };
    return Socket;
});