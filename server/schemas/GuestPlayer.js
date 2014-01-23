if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    'mongoose'
], function (Mongoose) {
    'use strict';

    var Schema = Mongoose.Schema;

    var GuestPlayerSchema = new Schema({
        name: { type: String, required: true }
    });

    return GuestPlayerSchema;
});