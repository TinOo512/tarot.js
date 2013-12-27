if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
    './Player',
    './GuestPlayer'
], function (Player, GuestPlayer) {
    var model = {
        init: function(nbPlayers) {
            for (var i=0 ; i<nbPlayers-1 ; i++) {
                this.guestPlayers[i] = new GuestPlayer();
            }
        },
        player: Player,
        guestPlayers: [],
        rounds:[]
    }

    return model;
});