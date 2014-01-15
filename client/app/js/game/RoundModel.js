'use strict';

/* Round Model */

var roundModel = angular.module('RoundModel', []);

roundModel.service('Round', [
    function() {
        function Round() {
            /**
             * le distributeur
             */
            this.dealer = null;

            /**
             * le contrat
             */
            this.contract = null;

            /**
             * le preneur
             */
            this.taker = null;

            /**
             * la couleur appelee
             */
            this.calledColor = null;

            /**
             * le joueur appele
             */
            this.calledPlayer = null;

            /**
             * le nombre de bout
             */
            this.nbOudler = null;

            /**
             * le score d attaque
             */
            this.attackScore = null;

            /**
             * le score de defense
             */
            this.defenseScore = null;
        }

        /**
         * GETTER
         */
        Round.prototype.setDealer = function(dealer) {
            this.dealer = dealer;
        };
        Round.prototype.setContract = function(contract) {
            this.contract = contract;
        };
        Round.prototype.setTaker = function(taker) {
            this.taker = taker;
        };
        Round.prototype.setCalledColor = function(calledColor) {
            this.calledColor = calledColor;
        };
        Round.prototype.setCalledPlayer = function(calledPlayer) {
            this.calledPlayer = calledPlayer;
        };
        Round.prototype.setNbOudler = function(nbOudler) {
            this.nbOudler = nbOudler;
        };
        Round.prototype.setAttackScore = function(attackScore) {
            this.attackScore = attackScore;
        };
        Round.prototype.setDefenseScore = function(defenseScore) {
            this.defenseScore = defenseScore;
        };

        return Round;
    }]);