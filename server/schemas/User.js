if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    'mongoose',
    './Player',
    './GuestPlayer',
    './Game'
], function (Mongoose, Player, GuestPlayer, Game) {
    'use strict';

    var Schema = Mongoose.Schema;

    var UserSchema = new Schema({
        player: Player,
        guestPlayers: [
            GuestPlayer
        ],
        games: [
            Game
        ]
    });

    //Player Methods

    //GuestPlayer Methods
    UserSchema.methods.hasGuestPlayer = function (guestPlayer) {
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
    UserSchema.methods.getUnfinishedGame = function () {
        var result = false;
        for (var i=0 ; i<this.games.length ; i++) {
            if (this.games[i].status) {
                result = this.games[i];
                break;
            }
        }
        return result;
    }

    return UserSchema;
});