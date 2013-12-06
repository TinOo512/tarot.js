'use strict';

/* Game Controllers */

var gameCtrl = angular.module('GameCtrl', ['GameModel']);

gameCtrl.controller('GameCtrl', ['$scope', '$rootScope', '$routeParams', 'GameModel',
    function($scope, $rootScope, $routeParams, Game) {
        $rootScope.active = 'game';
        $scope.nbPlayers = $routeParams.nbPlayers;
        var nbPlayers = parseInt($routeParams.nbPlayers);
        switch (nbPlayers) {
            case 3:
                gameAtThreePlayers($scope, Game);
                break;
            case 4:
                gameAtFourPlayers($scope, Game);
                break;
            case 5:
                gameAtFivePlayers($scope, Game);
                break;
        }
    }]);

function gameAtThreePlayers($scope, Game) {
    console.log('3');
    $scope.range = [
        [0, 1, 2]
    ];
    Game.init(3);
    $scope.Game = Game;

    $scope.submit = function(Game) {
        console.log(Game);
    };

}

function gameAtFourPlayers($scope, Game) {
    console.log('4');
    $scope.range = [
        [0, 1, 2],
        [3]
    ];
    Game.init(4);
    $scope.Game = Game;

    $scope.submit = function(Game) {
        console.log(Game);
    };
}

function gameAtFivePlayers($scope, Game) {
    console.log('5');
    $scope.range = [
        [0, 1, 2],
        [3, 4]
    ];
    Game.init(5);
    $scope.Game = Game;

    $scope.submit = function(Game) {
        console.log(Game);
    };
}