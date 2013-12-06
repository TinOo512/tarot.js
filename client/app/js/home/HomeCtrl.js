'use strict';

/* Home Controllers */

var homeCtrl = angular.module('HomeCtrl', []);

homeCtrl.controller('HomeCtrl', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        console.log('HomeCtrl');
        $rootScope.active = 'home';
    }]);