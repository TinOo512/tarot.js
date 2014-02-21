'use strict';

/* App Module */

var tarotApp = angular.module('tarotApp', [
  'ngRoute',
  'AuthService',
  'RootCtrl',
  'HomeCtrl',
  'GameCtrl',
  'GamesHistoryCtrl',
  'AboutCtrl',
]);

tarotApp.run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth){
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        if(next.authenticate) {
            Auth.isAuthenticated(function(authenticated) {
                console.log('authenticated', authenticated);
                if (!authenticated) {
                    // User isn’t authenticated
                    $location.path('/user/login');
                    event.preventDefault();
                }
            });
        }
    });
}]);

tarotApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html', authenticate: false});
  $routeProvider.when('/game/creation/:nbPlayers', {templateUrl: 'partials/game-creation.html', authenticate: false});
  $routeProvider.when('/game/panel', {templateUrl: 'partials/game-panel.html', authenticate: true});
  $routeProvider.when('/games-history', {templateUrl: 'partials/games-history.html', authenticate: true});
  $routeProvider.when('/about', {templateUrl: 'partials/about.html', authenticate: false});
  $routeProvider.otherwise({redirectTo: '/'});
}]);


