if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
], function () {
    'use strict';

    /*var Schema = Mongoose.Schema;

    var PlayerSchema = new Schema({
        name:  { type: String, required: true, unique: true },
        password: { type: String }
    });

    return PlayerSchema;*/

    var Player = {
        name:  { type: String, required: true, unique: true },
        password: { type: String }
    };

    return Player;
});