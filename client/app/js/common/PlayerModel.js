'use strict';

/* Player Model */

var playerModel = angular.module('PlayerModel', []);

playerModel.service('Player', [
    function() {
        var Player = {
            name: null,
            password: null
        }

        return Player;
    }]);