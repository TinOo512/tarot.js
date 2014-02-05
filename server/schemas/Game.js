if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    'mongoose',
    './GuestPlayer',
    './Round'
], function (Mongoose, GuestPlayer, Round) {
    'use strict';

    var Schema = Mongoose.Schema;

    var GameSchema = new Schema({
        status: { type: Boolean, required: true },
        nbPlayers: { type: Number, required: true },
        dateStart: { type: Date, require: true },
        dateFinish: { type: Date },
        guestPlayers: [
            GuestPlayer
        ],
        rounds: [
            Round
        ]
     });

     return GameSchema;
});