'use strict';

/* Constantes Service */

var constsService = angular.module('ConstsService', []);

constsService.service('Consts', [
    function(){
        // private

        // public
        return {
            BASIC_POINTS: 25,
            PRISE_MULTIPLIER: 1,
            GARDE_MULTIPLIER: 2,
            GARDE_SANS_MULTIPLIER: 4,
            GARDE_CONTRE_MULTIPLIER: 6,
            PETIT_AU_BOUT_POINTS: 10,
            MISERE_POINTS: 10,
            HANDFUL_BONUS: 20,
            DOUBLE_HANDFUL_BONUS: 30,
            TRIPLE_HANDFUL_BONUS: 40,
            ANNOUNCED_SLAM_SUCCEED: 400,
            ANNOUNCED_SLAM_FAILED: -200,
            NON_ANNOUNCED_SLAM_SUCCEED: 200
        };
    }]);