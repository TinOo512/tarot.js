if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    '../lib/mongoose',
    '../models/Game'
], function (mongoose, game) {

    var game = {};

    function saveGame(guestPlayers) {
        var GuestPlayer = mongoose.models.guestPlayer;
        var Game = mongoose.models.game;

        // ajout de la cle etrangere id_player
        for (var i=0 ; i<guestPlayers.length ; i++) {
            guestPlayers[i].id_player = game.id_player;
        }

        GuestPlayer.find({ $or: guestPlayers }, '_id name', function (err, res) {
            // on enleve les players qui existe deja pour pas les inserts
            for (var i=0 ; i<res.length ; i++) {
                for (var j=0 ; j<guestPlayers.length ; j++) {
                    if (res[i].name == guestPlayers[j].name) {
                        guestPlayers.splice(j, 1)
                    }
                }
            }

            GuestPlayer.create(guestPlayers, function (err) {
                if (!err) {
                    game.ids_guest_player = [];
                    for (var i=1 ; i<arguments.length ; i++) {
                        game.ids_guest_player.push(arguments[i]._id);
                    }
                    game.status = true;
                    Game.findOne(game, '_id', function (err, res) {
                        if (!res) {
                            new Game(game).save(function (err, res, numberAffected) {
                            });
                        }
                    });
                }
            });
        });
    }

    var Socket = {
        addGameAction: function(req) {
            var Player = mongoose.models.player;

            var player = req.data.game.player;
            var guestPlayers = req.data.game.guestPlayers;

            Player.findOne(player, '_id name password', function (err, res) {
                // si le model est null
                if (!res) {
                    // on insert un nouveau player
                    new Player(player).save(function (err, res, numberAffected) {
                        if (!res) {
                            game.id_player = res._id;
                            // si le player est bien insert on save les guest et la game
                            saveGame(guestPlayers);
                        }
                    });
                // si le model n'est pas null
                } else {
                    game.id_player = res._id;
                    saveGame(guestPlayers);
                }
            });
        },

        getGameAction: function(req) {
            var Game = mongoose.models.game;

        }
    };
    return Socket;
});