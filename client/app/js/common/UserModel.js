'use strict';

/* User Model */

var userModel = angular.module('UserModel', []);

userModel.service('User', [
    function() {
        var User = {
            name: null,
            password: null
        }

        return User;
    }]);