'use strict';

/* Game Controllers */

var gameCtrl = angular.module('GameCtrl', ['ConstsService', 'UserModel', 'GameModel', 'RoundModel', 'RoundFormsDirectives']);

gameCtrl.controller('GameCreationCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'User', 'Game', 'Socket',
    function($scope, $rootScope, $routeParams, $location, User, Game, Socket) {
        //todo: use the Player of the rootScope
        //todo: refactor this and set the authenticated=true if game/add-game return true
        console.log('GameCreationCtrl');

        $rootScope.active = 'game';
        $scope.nbPlayers = $routeParams.nbPlayers;
        var nbPlayers = parseInt($routeParams.nbPlayers);
        switch (nbPlayers) {
            case 3:
                gameAtThreePlayers($scope, $location, User, Game, Socket);
                break;
            case 4:
                gameAtFourPlayers($scope, $location, User, Game, Socket);
                break;
            case 5:
                gameAtFivePlayers($scope, $location, User, Game, Socket);
                break;
        }

        function gameAtThreePlayers($scope, $location, User, Game, Socket) {
            console.log('3');
            $scope.range = [
                [0, 1, 2]
            ];
            Game.init(3);
            $scope.Game = Game;

            $scope.submit = function(Game) {
                Game.addUser(User.name);
                Socket.emit('game/add-game', { user: User, game: Game });
                return $location.path('/game/panel');
            };

        }

        function gameAtFourPlayers($scope, $location, User, Game, Socket) {
            console.log('4');
            $scope.range = [
                [0, 1, 2],
                [3]
            ];
            Game.init(4);
            $scope.Game = Game;

            $scope.submit = function(Game) {
                Game.addUser(User.name);
                Socket.emit('game/add-game', { user: User, game: Game });
                return $location.path('/game/panel');
            };
        }

        function gameAtFivePlayers($scope, $location, User, Game, Socket) {
            console.log('5');
            $scope.range = [
                [0, 1, 2],
                [3, 4]
            ];
            Game.init(5);
            $scope.Game = Game;

            $scope.submit = function(Game) {
                Game.addUser(User.name);
                Socket.emit('game/add-game', { user: User, game: Game });
                return $location.path('/game/panel');
            };
        }
    }]);

gameCtrl.controller('GamePanelCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Consts', 'Game', 'Round', 'Socket',
    function($scope, $rootScope, $routeParams, $location, Consts, Game, Round, Socket) {
        console.log('GamePanelCtrl');
        $rootScope.active = 'game';
        $scope.Consts = Consts;

        function setScope() {
            $scope.Game = Game;
            $scope.nbRound = Game.rounds.length;
        }

        $scope.Round = new Round();

        if (Game.isEmpty()) {
            Socket.emit('game/get-game', {}, function (data) {
                if (!data.success) return $location.path('/user/login');

                // On instencie les objets rounds pour les methodes prototype
                // todo : find better ?!
                for (var i = 0, length = data.game.rounds.length ; i < length ; i++) {
                    data.game.rounds[i] = new Round().init(data.game.rounds[i]);
                }

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
                debugger;
                $scope.Game.rounds.push(Round);

                Socket.emit('game/push-round', {round: Round}, function (data) {
                    debugger;
                });
            } else {
                console.log('notValid');
                $scope.donne_form.submitted = true;
            }
        }
    }]);