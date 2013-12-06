'use strict';

/* Game Model */

var gameModel = angular.module('GameModel', ['PlayerModel']);

gameModel.service('GameModel', ['PlayerModel',
    function(Player) {
        var model = {
            init: function(nbPlayers) {
                for (var i=0 ; i<nbPlayers ; i++) {
                    this.players[i] = new Player();
                }
            },
            players: []
        }

        return model;
    }]);