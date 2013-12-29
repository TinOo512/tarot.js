if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    'mongoose',
    './GuestPlayer'
], function (Mongoose, GuestPlayer) {
    /*var Schema = Mongoose.Schema;

    var GameSchema = new Schema({
        id_player: { type: Schema.Types.ObjectId, required: true },
        ids_guest_player: { type: [Schema.Types.ObjectId], required: true },
        status: { type: Boolean, required: true }
    });

    return GameSchema;*/

    var Game = {
        guest_players: [
            GuestPlayer
        ],
        status: { type: Boolean, required: true }
     }

     return Game;
});