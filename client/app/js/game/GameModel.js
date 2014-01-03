'use strict';

/* Game Model */

var gameModel = angular.module('GameModel', ['GuestPlayerModel']);

gameModel.service('Game', ['GuestPlayer',
    function(GuestPlayer) {
        var model = {
            init: function(nbPlayers) {
                for (var i=0 ; i<nbPlayers-1 ; i++) {
                    this.guestPlayers[i] = new GuestPlayer();
                }
            },
            status: null,
            guestPlayers: [],
            rounds:[]
        }

        return model;
    }]);