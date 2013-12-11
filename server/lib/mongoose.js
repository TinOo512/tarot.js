if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    'mongoose'
], function (Mongoose) {
    var mongoose = {
        instance: null,
        models: null,
        init: function(){
            //initialisation de la connection à la bdd
            this.instance = Mongoose.connect('mongodb://localhost/test', {
                user: '',
                pass: ''
            });

            //chargement des models
            this.models = {
                'player': this.instance.model('Player', require(__dirname + '/../models/Player'))
            }
        }
    }
    return mongoose;
});