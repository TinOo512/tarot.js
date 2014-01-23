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
        guestPlayers: [
            GuestPlayer
        ],
        rounds: [
            Round
        ]
     });

     return GameSchema;
});