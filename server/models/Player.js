if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    'mongoose'
], function (Mongoose) {
    var Schema = Mongoose.Schema;

    var PlayerSchema = new Schema({
        name:  { type: String, required: true, unique: true },
        password: { type: String, required: true }

    });

    return PlayerSchema;
});