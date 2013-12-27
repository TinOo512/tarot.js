if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
define([
], function () {
    function GuestPlayer() {
        this.name = null;
    }

    return GuestPlayer;
});