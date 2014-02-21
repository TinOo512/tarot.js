'use strict';

/* User Model */

var userModel = angular.module('UserModel', []);

userModel.factory('User', [
    function() {
        var User = {
            name: null,
            password: null
        }

        return User;
    }]);