'use strict';

/* Game Controllers */

var gameCtrl = angular.module('GameCtrl', ['GameModel']);

gameCtrl.controller('GameCreationCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Game', 'Socket',
    function($scope, $rootScope, $routeParams, $location, Game, Socket) {
        $rootScope.active = 'game';
        $scope.nbPlayers = $routeParams.nbPlayers;
        var nbPlayers = parseInt($routeParams.nbPlayers);
        switch (nbPlayers) {
            case 3:
                gameAtThreePlayers($scope, $location, Game, Socket);
                break;
            case 4:
                gameAtFourPlayers($scope, $location, Game, Socket);
                break;
            case 5:
                gameAtFivePlayers($scope, $location, Game, Socket);
                break;
        }
    }]);

function gameAtThreePlayers($scope, $location, Game, Socket) {
    console.log('3');
    $scope.range = [
        [0, 1, 2]
    ];
    Game.init(3);
    $scope.Game = Game;

    $scope.submit = function(Game) {
        debugger;
        console.log(Game);
        Socket.emit('player/add-user', { player: Game.players[0] });
        $location.path('/game/panel');
    };

}

function gameAtFourPlayers($scope, $location, Game, Socket) {
    console.log('4');
    $scope.range = [
        [0, 1, 2],
        [3]
    ];
    Game.init(4);
    $scope.Game = Game;

    $scope.submit = function(Game) {
        console.log(Game);
        Socket.emit('player/add-user', { player: Game.players[0] });
        $location.path('/game/panel');
    };
}

function gameAtFivePlayers($scope, $location, Game, Socket) {
    console.log('5');
    $scope.range = [
        [0, 1, 2],
        [3, 4]
    ];
    Game.init(5);
    $scope.Game = Game;

    $scope.submit = function(Game) {
        console.log(Game);
        Socket.emit('player/add-user', { player: Game.players[0] });
        $location.path('/game/panel');
    };
}

gameCtrl.controller('GamePanelCtrl', ['$scope', '$rootScope', '$routeParams', 'Game', 'Socket',
    function($scope, $rootScope, $routeParams, Game, Socket) {
        $rootScope.active = 'game';

        console.log(Game);

    }]);