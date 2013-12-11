if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    'mongoose'
], function (Mongoose) {
    var Schema = Mongoose.Schema;

    var PlayerSchema = new Schema({
        name:  String
    });

    return PlayerSchema;
});