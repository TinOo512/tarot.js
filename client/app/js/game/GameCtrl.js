'use strict';

/* Game Controllers */

var gameCtrl = angular.module('GameCtrl', ['PlayerModel', 'GameModel']);

gameCtrl.controller('GameCreationCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Player', 'Game', 'Socket',
    function($scope, $rootScope, $routeParams, $location, Player, Game, Socket) {
        $rootScope.active = 'game';
        $scope.Player = Player;
        $scope.nbPlayers = $routeParams.nbPlayers;
        var nbPlayers = parseInt($routeParams.nbPlayers);
        switch (nbPlayers) {
            case 3:
                gameAtThreePlayers($scope, $location, Player, Game, Socket);
                break;
            case 4:
                gameAtFourPlayers($scope, $location, Player, Game, Socket);
                break;
            case 5:
                gameAtFivePlayers($scope, $location, Player, Game, Socket);
                break;
        }

        function gameAtThreePlayers($scope, $location, Player, Game, Socket) {
            console.log('3');
            $scope.range = [
                [0, 1, 2]
            ];
            Game.init(3);
            $scope.Game = Game;

            $scope.submit = function(Game) {
                Socket.emit('game/add-game', { player: Player, game: Game });
                $location.path('/game/panel');
            };

        }

        function gameAtFourPlayers($scope, $location, Player, Game, Socket) {
            console.log('4');
            $scope.range = [
                [0, 1, 2],
                [3]
            ];
            Game.init(4);
            $scope.Game = Game;

            $scope.submit = function(Game) {
                Socket.emit('game/add-game', { player: Player, game: Game });
                $location.path('/game/panel');
            };
        }

        function gameAtFivePlayers($scope, $location, Player, Game, Socket) {
            console.log('5');
            $scope.range = [
                [0, 1, 2],
                [3, 4]
            ];
            Game.init(5);
            $scope.Game = Game;

            $scope.submit = function(Game) {
                Socket.emit('game/add-game', { player: Player, game: Game });
                $location.path('/game/panel');
            };
        }
    }]);

gameCtrl.controller('GamePanelCtrl', ['$scope', '$rootScope', '$routeParams', 'Player', 'Game', 'Socket',
    function($scope, $rootScope, $routeParams, Player, Game, Socket) {
        function setScope() {
            $scope.Player = Player;
            $scope.Game = Game;
            $scope.nbRound = Game.rounds.length;
        }

        $rootScope.active = 'game';

        Socket.emit('game/get-game', {});
        Socket.on('game/get-game', function (data) {
            Player = data.player;
            Game = data.game;

            setScope();
        });

        setScope();
    }]);