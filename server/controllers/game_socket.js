if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    '../lib/mongoose',
    'bcrypt'
], function (mongoose, bcrypt) {
    'use strict';

    var user = null,
        players = null;

    function pushGuestPlayers(req, res) {
        // on commence a 1 car l'offset 0 contient l'user
        for (var i=1 ; i<players.length ; i++) {
            // on insert le guestPlayers si celui-ci n'existe pas deja
            if (!res.hasGuestPlayer(players[i])) {
                res.guestPlayers.push(players[i]);
            }
        }

        pushGame(req, res);
    }

    function pushGame(req, res) {
        //todo: opti, ajouter le status dans la request et check le length
        var unfinishedGame = res.getUnfinishedGame();
        if (!unfinishedGame) {
            var game = {};
            game.players = players;
            game.status = true;
            game.nbPlayers = game.players.length;
            game.dateStart = new Date();
            res.games.push(game);

            res.save(function (err, res, numberAffected) {
                if (err) throw new Error("Mongoose - "+err.message);
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
            var Tarot = mongoose.models.tarot;

            user = req.data.user;
            players = req.data.game.players;

            var res = Tarot.findUserByName(user, false);
            // si l'username et le password match
            if (res._id) {
                req.session._id = res._id;
                req.session.user = res.user;
                // on ajoute les guestPlayers
                pushGuestPlayers(req, res);
            //sinon
            } else {
                // on insert un nouveau player
                var tarot = new Tarot();
                // sans oublie de hash le password
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(user.password, salt, function(err, hash) {
                        user.password = hash;
                        tarot.user = user;
                        tarot.save(function (err, res, numberAffected) {
                            if (err) throw new Error("Mongoose - "+err.message);
                            // si le player est bien insert
                            if (res) {
                                // on ajoute l'id en session
                                req.session._id = res._id;
                                req.session.user = res.user;

                                // on ajoute les guestPlayers
                                pushGuestPlayers(req, res);
                            }
                        });
                    });
                });
            }
        },

        getGameAction: function(req) {
            var Tarot = mongoose.models.tarot;

            Tarot.findOne({'games._id': req.session.game_id}, 'games', { lean: true }, function (err, res) {
                if (err) throw new Error("Mongoose - "+err.message);
                var response;
                // si le model n'est pas null
                if (res) {
                    response = {success: true, game: res.games[0]};
                } else {
                    response = {success: false};
                }
                req.io.respond(response);
            });
        },

        pushRoundAction: function (req) {
            var Tarot = mongoose.models.tarot;

            Tarot.findOne({'games._id': req.session.game_id}, 'games', function (err, res) {
                if (err) throw new Error("Mongoose - "+err.message);
                // si le model n'est pas null
                if (res) {
                    res.games[0].rounds.push(req.data.round);

                    res.save(function (err, res, numberAffected) {
                        if (err) throw new Error("Mongoose - "+err.message);
                        // si la round est bien insert
                        if (res) {
                            req.io.respond({success: true});
                        } else {
                            req.io.respond({success: false});
                        }
                    });
                }
            });
        },

        getHistoryAction: function(req) {
            var Tarot = mongoose.models.tarot;
            Tarot.findById(req.session._id, 'games', {lean : true} , function(err, res){
                if(res){
                    req.io.respond({success: true, games: res.games});
                }
            })
        }
    };
    return Socket;
});