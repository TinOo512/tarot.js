'use strict';

/* Game Model */

var gameModel = angular.module('GameModel', ['GuestPlayerModel']);

gameModel.service('Game', ['GuestPlayer',
    function(GuestPlayer) {
        var model = {
            init: function(nbPlayers) {
                this.nbPlayers = nbPlayers;
                for (var i=0 ; i<nbPlayers-1 ; i++) {
                    this.guestPlayers[i] = new GuestPlayer();
                }
            },
            status: null,
            nbPlayers: null,
            guestPlayers: [],
            rounds:[],
            isEmpty: function () {
                if (this.status === null && this.nbPlayers === null && this.guestPlayers.length === 0 && this.rounds.length === 0)
                    return true;
                else
                    return false;
            }
        }

        return model;
    }]);