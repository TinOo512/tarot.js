if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    'mongoose',
    './Player',
    './GuestPlayer',
    './Game'
], function (Mongoose, Player, GuestPlayer, Game) {
    var Schema = Mongoose.Schema;

    var TarotSchema = new Schema({
        player: Player,
        guest_players: [
            GuestPlayer
        ],
        games: [
            Game
        ]
    });

    return TarotSchema;
});