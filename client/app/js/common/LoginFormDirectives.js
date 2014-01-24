'use strict';

/* Login Forms Directives */

var loginFormDirectives = angular.module('LoginFormDirectives', []);

loginFormDirectives.directive('ngFormLogin', function() {
    return {
        restrict: 'A',
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
