if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    'mongoose'
], function (Mongoose) {
    'use strict';

    var mongoose = {
        instance: null,
        models: null,
        init: function(){
            //initialisation de la connection à la bdd
            this.instance = Mongoose.connect('mongodb://localhost/tarot-js', {
                user: '',
                pass: ''
            });

            //chargement des models
            this.models = {
                'tarot': this.instance.model('tjs_tarot', require(__dirname + '/../schemas/Tarot'))/*,
                'player': this.instance.model('Player', require(__dirname + '/../schemas/Player')),
                'guestPlayer': this.instance.model('GuestPlayer', require(__dirname + '/../schemas/GuestPlayer')),
                'game': this.instance.model('Game', require(__dirname + '/../schemas/Game'))*/
            }
        }
    }
    return mongoose;
});