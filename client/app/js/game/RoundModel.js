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

        return Round;
    }]);