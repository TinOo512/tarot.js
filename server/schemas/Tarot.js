if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    'mongoose',
    'bcrypt',
    './User',
    './Player',
    './Game'
], function (Mongoose, bcrypt, User, Player, Game) {
    'use strict';

    var Schema = Mongoose.Schema;

    var TarotSchema = new Schema({
        user: User,
        guestPlayers: [
            Player
        ],
        games: [
            Game
        ]
    });

    //Class Methods

    TarotSchema.static('findUserByName', function (user, lean, callback) {
        this.findOne({'user.name': user.name}, 'user', { lean: lean }, function (err, res) {
            if (err) throw new Error("Mongoose - "+err.message);
            // si le model est null
            if (res) {
                //on compare le password en clair avec le hash
                bcrypt.compare(user.password, res.user.password, function(bcryptErr, bcryptRes) {
                    if (bcryptRes === true) {
                        return callback(res);
                    }
                    return callback(false)
                });
            } else {
                return callback(false)
            }
        });
    });

    //Instance Methods

    //GuestPlayer Methods
    TarotSchema.methods.hasGuestPlayer = function (guestPlayer) {
        var result = false;
        for (var i=0 ; i<this.guestPlayers.length ; i++) {
            if (this.guestPlayers[i].name == guestPlayer.name) {
                result = true;
                break;
            } else {
                result = false;
            }
        }
        return result;
    }

    //Game Methods
    TarotSchema.methods.getUnfinishedGame = function () {
        var result = false;
        for (var i=0 ; i<this.games.length ; i++) {
            if (this.games[i].status) {
                result = this.games[i];
                break;
            }
        }
        return result;
    }

    return TarotSchema;
});