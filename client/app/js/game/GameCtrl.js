'use strict';

/* Game Controllers */

var gameCtrl = angular.module('GameCtrl', ['PlayerModel', 'GameModel', 'RoundModel', 'RoundFormsDirectives']);

gameCtrl.controller('GameCreationCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Player', 'Game', 'Socket',
    function($scope, $rootScope, $routeParams, $location, Player, Game, Socket) {
        //todo: use the Player of the rootScope

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
                return $location.path('/game/panel');
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
                return $location.path('/game/panel');
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
                return $location.path('/game/panel');
            };
        }
    }]);

gameCtrl.controller('GamePanelCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Game', 'Round', 'Socket',
    function($scope, $rootScope, $routeParams, $location, Game, Round, Socket) {
        $rootScope.active = 'game';

        function setScope() {
            $scope.Game = Game;
            $scope.nbRound = Game.rounds.length;
        }

        $scope.Round = new Round();

        if (Game.isEmpty()) {
            Socket.emit('game/get-game', {}, function (data) {
                if (!data.success) return $location.path('/user/login');
                Game = data.game;
                setScope();
            });
        } else {
            setScope();
        }

        $scope.submit = function(Round) {
            if ($scope.donne_form.$valid) {
                // Submit as normal
                console.log('valid');
                Socket.emit('game/push-round', {round: Round}, function (data) {
                    debugger;
                });
            } else {
                console.log('notValid');
                $scope.donne_form.submitted = true;
            }
        }
    }]);