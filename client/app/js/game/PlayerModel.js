'use strict';

/* Player Model */

var playerModel = angular.module('PlayerModel', []);

playerModel.service('Player', [
    function() {
        function Player(name, owner) {
            this.name = (typeof name === "undefined") ? null : name;
        }

        return Player;
    }]);