'use strict';

/* About Controllers */

var aboutCtrl = angular.module('AboutCtrl', []);

aboutCtrl.controller('AboutCtrl', ['$scope', '$rootScope',
    function($scope, $rootScope) {
        console.log('AboutCtrl');
        $rootScope.active = 'about';
    }]);