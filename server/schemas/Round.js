if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    'mongoose'
], function (Mongoose) {
    'use strict';

    var Schema = Mongoose.Schema;

    var RoundSchema = new Schema({
        dealer: { type: String, required: true },
        contractMultiplier: { type: Number, required: true },
        taker: { type: String, required: true },
        calledColor: { type: String, required: false },
        calledPlayer: { type: String, required: false },
        nbOudler: { type: Number, required: true },
        attackScore: { type: Number, required: true },
        defenseScore: { type: Number, required: true }
    });

    return RoundSchema;
});