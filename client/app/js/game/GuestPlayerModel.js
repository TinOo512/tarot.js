'use strict';

/* GuestPlayer Model */

var guestPlayerModel = angular.module('GuestPlayerModel', []);

guestPlayerModel.service('GuestPlayer', [
    function() {
        function GuestPlayer() {
            this.name = null;
        }

        return GuestPlayer;
    }]);