'use strict';

/* Game Model */

var gameModel = angular.module('GameModel', ['PlayerModel']);

gameModel.service('Game', ['Player',
    function(Player) {
        var model = {
            init: function(nbPlayers) {
                this.nbPlayers = nbPlayers;
                // on commence a 1 car l'offset 0 contiendra l'user
                for (var i=1 ; i<nbPlayers ; i++) {
                    this.players[i] = new Player();
                }
            },
            status: null,
            nbPlayers: null,
            players: [],
            rounds:[],
            isEmpty: function () {
                if (this.status === null && this.nbPlayers === null && this.players.length === 0 && this.rounds.length === 0)
                    return true;
                else
                    return false;
            },
            addUser: function (name) {
                this.players[0] = new Player(name);
            }
        }

        return model;
    }]);