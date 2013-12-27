'use strict';

/* Game Model */

var gameModel = angular.module('GameModel', ['PlayerModel', 'GuestPlayerModel']);

gameModel.service('Game', ['Player', 'GuestPlayer',
    function(Player, GuestPlayer) {
        var model = {
            init: function(nbPlayers) {
                for (var i=0 ; i<nbPlayers-1 ; i++) {
                    this.guestPlayers[i] = new GuestPlayer();
                }
            },
            player: Player,
            guestPlayers: [],
            rounds:[]
        }

        return model;
    }]);