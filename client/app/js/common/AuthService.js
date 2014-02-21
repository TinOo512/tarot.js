'use strict';

/* Authentification Service */

var authService = angular.module('AuthService', []);

authService.factory('Auth', ['Socket',
    function(Socket){
        return {
            authenticated: null,
            isAuthenticated: function(callback) {
                var self = this;
                if (this.authenticated != null) {
                    return callback(this.authenticated);
                } else {
                    Socket.emit('user/is-logged', {}, function (data) {
                        return callback(self.authenticated = data);
                    });
                }
            }
        };
    }]);