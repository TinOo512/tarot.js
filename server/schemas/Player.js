if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    'mongoose'
], function (Mongoose) {
    'use strict';

    var Schema = Mongoose.Schema;

    var PlayerSchema = new Schema({
        name: { type: String, required: true }
        //isOwner: { type: Boolean, required: true }
    });

    return PlayerSchema;
});