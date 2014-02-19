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
        $scope.User = User;

        Socket.emit('player/get-player', {}, function (rep) {
            if (rep.success)
                $scope.User = rep.user;
            else
                $scope.User = User;
        });

        $scope.submitLogin = function(User){
            Socket.emit('user/submit-login', {user:User}, function (rep) {
                console.log(rep);
            });
        };
    }]);