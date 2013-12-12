'use strict';

/* App Module */

var tarotApp = angular.module('tarotApp', [
  'ngRoute',
  'SocketService',
  'HomeCtrl',
  'GameCtrl',
  'GamesHistoryCtrl',
  'AboutCtrl'
]);

tarotApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/game/creation/:nbPlayers', {templateUrl: 'partials/game-creation.html', controller: 'GameCreationCtrl'});
  $routeProvider.when('/game/panel', {templateUrl: 'partials/game-panel.html', controller: 'GamePanelCtrl'});
  $routeProvider.when('/games-history', {templateUrl: 'partials/games-history.html', controller: 'GamesHistoryCtrl'});
  $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'AboutCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
