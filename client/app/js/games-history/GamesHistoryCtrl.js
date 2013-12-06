'use strict';

/* GamesHistoryCtrl Controllers */

var gamesHistoryCtrl = angular.module('GamesHistoryCtrl', []);

gamesHistoryCtrl.controller('GamesHistoryCtrl', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        console.log('GamesHistoryCtrl');
        $rootScope.active = 'gamesHistory';
    }]);