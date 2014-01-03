if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    'mongoose'
], function (Mongoose) {
    'use strict';

    /*var Schema = Mongoose.Schema;

    var GuestPlayerSchema = new Schema({
        id_player: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true }
    });

    return GuestPlayerSchema;*/

    var GuestPlayers = {
        name: { type: String, required: true }
    }

    return GuestPlayers;
});