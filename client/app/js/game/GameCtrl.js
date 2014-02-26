'use strict';

/* Game Controllers */

var gameCtrl = angular.module('GameCtrl', ['ConstsService', 'UserModel', 'GameModel', 'RoundModel', 'RoundFormsDirectives']);

gameCtrl.controller('GameCreationCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'User', 'Game', 'Round', 'Socket',
    function($scope, $rootScope, $routeParams, $location, User, Game, Round, Socket) {
        console.log('GameCreationCtrl');

        $rootScope.active = 'game';
        $scope.User = angular.copy(User);
        $scope.nbPlayers = $routeParams.nbPlayers;
        var nbPlayers = parseInt($routeParams.nbPlayers);
        switch (nbPlayers) {
            case 3:
                console.log('3');
                $scope.range = [
                    [0, 1, 2]
                ];
                Game.init(3);
                break;
            case 4:
                console.log('4');
                $scope.range = [
                    [0, 1, 2],
                    [3]
                ];
                Game.init(4);
                break;
            case 5:
                console.log('5');
                $scope.range = [
                    [0, 1, 2],
                    [3, 4]
                ];
                Game.init(5);
                break;
        }

        $scope.Game = Game;

        $scope.submit = function(user, game) {
            game.addUser(user.name);
            Socket.emit('game/add-game', { user: user, game: game }, function (data) {
                // si la game a ete ajoute avec success
                if (data.success === true) {
                    Game.setGame(game);
                    return $location.path('/game/panel');
                // si une game est toujours n'est pas fini
                } else if (data.game) {
                    // On instencie les objets rounds pour les methodes prototype
                    for (var i = 0, length = data.game.rounds.length ; i < length ; i++) {
                        data.game.rounds[i] = new Round().init(data.game.rounds[i]);
                    }

                    Game.setGame(data.game);
                    return $location.path('/game/panel');
                }
                //sinon error
                return $location.path('/');
            });
        };
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
                for (var i = 0, length = data.game.rounds.length ; i < length ; i++) {
                    data.game.rounds[i] = new Round().init(data.game.rounds[i]);
                }

                Game.setGame(data.game);
                setScope();
            });
        } else {
            setScope();
        }

        $scope.submit = function(Round) {
            if ($scope.donne_form.$valid) {
                // Submit as normal
                console.log('valid');
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