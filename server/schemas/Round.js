if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
], function () {
    'use strict';

    var Round = {
        dealer: { type: String, required: true },
        contract: { type: String, required: true },
        taker: { type: String, required: true },
        calledColor: { type: String, required: false },
        calledPlayer: { type: String, required: false },
        nbOudler: { type: Number, required: true },
        attackScore: { type: Number, required: true },
        defenseScore: { type: Number, required: true }
    }

    return Round;
});