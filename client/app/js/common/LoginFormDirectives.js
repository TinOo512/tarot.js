'use strict';

/* Login Forms Directives */

var loginFormDirectives = angular.module('LoginFormDirectives', ['AuthService', 'UserModel']);

loginFormDirectives.directive('ngBtnLogin', function() {
    return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs, ctrl) {
            iElement.on('click',function(){
                if (iElement.hasClass('active')) {
                    iElement.removeClass('active');
                    $('#login-content').css('display','none');
                } else {
                    iElement.addClass('active');
                    $('#login-content').css('display','block');
                }
            });
        }
    }
});

loginFormDirectives.directive('ngFormLogin', function() {
    return {
        restrict: 'A',
        //require: '^ngModel',
        scope: {},
        template:
            '<form class="navbar-form navbar-right" role="form" ng-submit="submitLogin(User)">' +
                '<div class="form-group">' +
                    '<input required ng-model="User.name" type="text" placeholder="Email" class="form-control">' +
                '</div>' +
                '<div class="form-group">' +
                    '<input required ng-model="User.password" type="password" placeholder="Password" class="form-control">' +
                '</div>' +
                '<button type="submit" class="btn btn-success">Sign in</button>' +
            '</form>',
        controller: ['$scope', 'Socket', 'Auth', 'User', function($scope, Socket, Auth, User) {
            $scope.submitLogin = function(user){
                Socket.emit('user/submit-login', {user:user}, function (rep) {
                    if (rep !== false) {
                        Auth.authenticated = true;
                        User.name = user.name;
                    }
                });
            };
        }],
        link: function(scope, iElement, iAttrs, ctrl) {
            iElement.find('input,button').on('focus',function(){
                $('#login-content').css('opacity','1');
            });
            iElement.find('input,button').on('focusout',function(){
                $('#login-content').css('opacity','0');
            });
        }
    }
});
