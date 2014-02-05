'use strict';

/* GamesHistoryCtrl Controllers */

var gamesHistoryCtrl = angular.module('GamesHistoryCtrl', []);

gamesHistoryCtrl.controller('GamesHistoryCtrl', ['$scope', '$rootScope', 'Socket',
    function($scope, $rootScope, Socket) {
        console.log('GamesHistoryCtrl');
        $rootScope.active = 'gamesHistory';

        Socket.emit('game/get-games', {}, function (data) {
            if (!data.success) return $location.path('/user/login');
            $scope.games = data.games;
        });


    }]);