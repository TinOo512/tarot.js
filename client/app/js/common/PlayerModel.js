'use strict';

/* Player Model */

var playerModel = angular.module('PlayerModel', []);

playerModel.service('Player', [
    function() {
        function Player() {
            this.name = null;
            this.password = null;
        }

        return Player;
    }]);