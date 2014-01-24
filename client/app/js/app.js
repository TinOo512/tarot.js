'use strict';

/* App Module */

var tarotApp = angular.module('tarotApp', [
  'ngRoute',
  'SocketService',
  'HomeCtrl',
  'GameCtrl',
  'GamesHistoryCtrl',
  'AboutCtrl',
  'PlayerModel',
  'LoginFormDirectives'
]);

tarotApp.run(['$rootScope', 'Socket', 'Player', function($rootScope, Socket, Player){
    $rootScope.Player = Player;

    Socket.emit('player/get-player', {}, function (rep) {
        if (rep.success)
            $rootScope.Player = rep.player;
        else
            $rootScope.Player = Player;
    });

    $rootScope.submitLogin = function(Player){
        Socket.emit('user/submit-login', {player:Player}, function (rep) {
            console.log(rep);
        });
    };
}]);

tarotApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/game/creation/:nbPlayers', {templateUrl: 'partials/game-creation.html', controller: 'GameCreationCtrl'});
  $routeProvider.when('/game/panel', {templateUrl: 'partials/game-panel.html', controller: 'GamePanelCtrl'});
  $routeProvider.when('/games-history', {templateUrl: 'partials/games-history.html', controller: 'GamesHistoryCtrl'});
  $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'AboutCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);


