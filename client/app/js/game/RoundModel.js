'use strict';

/* Round Model */

var roundModel = angular.module('RoundModel', ['ConstsService']);

roundModel.factory('Round', ['Consts',
    function(Consts) {
        //private
        var ATTACK = 0;
        var DEFENSE = 1;

        //public
        function Round() {
            /**
             * le distributeur
             */
            this.dealer = null;

            /**
             * le coefficient du contrat
             */
            this.contractMultiplier = null;

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

            /**
             * le nombre de point du petit au bout
             */
            this.petitAuBout = null;

            /**
             * le nombre de point de la misere
             */
            this.misere = null;

            /**
             * le nombre de point de la poignee
             */
            this.handful = null;

            /**
             * le nombre de point du chelem
             */
            this.slam = null;
        }

        Round.prototype.init = function(Round) {
            this.dealer = Round.dealer;
            this.contractMultiplier = Round.contractMultiplier;
            this.taker = Round.taker;
            this.calledColor = Round.calledColor;
            this.calledPlayer = Round.calledPlayer;
            this.nbOudler = Round.nbOudler;
            this.attackScore = Round.attackScore;
            this.defenseScore = Round.defenseScore;
            this.petitAuBout = Round.petitAuBout;
            this.misere = Round.misere;
            this.handful = Round.handful;
            this.slam = Round.slam;

            return this;
        };

        Round.prototype.getContract = function(type) {
           switch (this.nbOudler) {
               case 0:
                   if (type === ATTACK) {
                       return 56;
                   } else {
                       return 35;
                   }
                   break;
               case 1:
                   if (type === ATTACK) {
                       return 51;
                   } else {
                       return 40;
                   }
                   break;
               case 2:
                   if (type === ATTACK) {
                       return 41;
                   } else {
                       return 50;
                   }
                   break;
               case 3:
                   if (type === ATTACK) {
                       return 36;
                   } else {
                       return 55;
                   }
                   break;
           }
        };

        Round.prototype.getScore = function(player) {
            var score;
            if (player === this.taker) {
                //taker
                score = ((25 + Math.abs(Math.round((this.attackScore - this.getContract(ATTACK))/10)*10) + this.petitAuBout) * this.contractMultiplier + this.handful + this.slam) * 2;
                if (!this.didContract(ATTACK))
                    score = score * -1;
            } else if (player === this.calledPlayer) {
                //attack team
                score = (25 + Math.abs(Math.round((this.attackScore - this.getContract(ATTACK))/10)*10) + this.petitAuBout) * this.contractMultiplier + this.handful + this.slam;
                if (!this.didContract(ATTACK))
                    score = score * -1;
            } else {
                //defense team
                score = (25 + Math.abs(Math.round((this.defenseScore - this.getContract(DEFENSE))/10)*10) + this.petitAuBout) * this.contractMultiplier + this.handful + this.slam;
                if (!this.didContract(DEFENSE))
                    score = score * -1;
            }
            return score;
        };

        Round.prototype.didContract = function(type) {
            var result = false;
            if (type === ATTACK) {
                result = (this.attackScore >= this.getContract(type));
            } else {
                result = (this.defenseScore >= this.getContract(type));
            }
            return result;
        }

        /**
         * GETTER
         */
        Round.prototype.setDealer = function(dealer) {
            this.dealer = dealer;
        };
        Round.prototype.setContractMultiplier = function(contractMultiplier) {
            this.contractMultiplier = contractMultiplier;
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
        Round.prototype.setPetitAuBout = function(petitAuBout) {
            this.petitAuBout = petitAuBout;
        };
        Round.prototype.setMisere = function(misere) {
            this.misere = misere;
        };
        Round.prototype.setHandful = function(handful) {
            this.handful = handful;
        };
        Round.prototype.setSlam = function(slam) {
            this.slam = slam;
        };

        return Round;
    }]);