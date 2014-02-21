'use strict';

/* RootCtrl Controllers */

var rootCtrl = angular.module('RootCtrl', [
    'LoginFormDirectives',
    'SocketService',
    'UserModel'
]);

rootCtrl.controller('RootCtrl', ['$scope', 'Socket', 'User',
    function($scope, Socket, User) {
        console.log('RootCtrl');

        Socket.emit('user/get-user', {}, function (rep) {
            if (rep.success)
                User = rep.user;

            $scope.User = User;
            /*$scope.$watch('root.User', function( newValue, oldValue ) {
                console.log(newValue, oldValue);
            });*/
        });
    }]);