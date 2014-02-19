'use strict';

/* App Module */

var tarotApp = angular.module('tarotApp', [
  'ngRoute',
  'RootCtrl',
  'HomeCtrl',
  'GameCtrl',
  'GamesHistoryCtrl',
  'AboutCtrl',
]);

tarotApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html'});
  $routeProvider.when('/game/creation/:nbPlayers', {templateUrl: 'partials/game-creation.html'});
  $routeProvider.when('/game/panel', {templateUrl: 'partials/game-panel.html'});
  $routeProvider.when('/games-history', {templateUrl: 'partials/games-history.html'});
  $routeProvider.when('/about', {templateUrl: 'partials/about.html'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);


