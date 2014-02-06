'use strict';

/* App Module */

var tarotApp = angular.module('tarotApp', [
  'ngRoute',
  'SocketService',
  'RootCtrl',
  'HomeCtrl',
  'GameCtrl',
  'GamesHistoryCtrl',
  'AboutCtrl',
  'UserModel',
  'LoginFormDirectives'
]);

tarotApp.run(['$rootScope', 'Socket', 'User', function($rootScope, Socket, User){
    //todo: rename Player to User
    console.log('TarotApp');
    $rootScope.User = User;

    Socket.emit('player/get-player', {}, function (rep) {
        if (rep.success)
            $rootScope.User = rep.user;
        else
            $rootScope.User = User;
    });

    $rootScope.submitLogin = function(User){
        Socket.emit('user/submit-login', {user:User}, function (rep) {
            console.log(rep);
        });
    };
}]);

tarotApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html'});
  $routeProvider.when('/game/creation/:nbPlayers', {templateUrl: 'partials/game-creation.html'});
  $routeProvider.when('/game/panel', {templateUrl: 'partials/game-panel.html'});
  $routeProvider.when('/games-history', {templateUrl: 'partials/games-history.html'});
  $routeProvider.when('/about', {templateUrl: 'partials/about.html'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);


