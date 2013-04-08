var boop = require('boop');

var PluginSocketio = module.exports = boop.extend({
    initialize : function (io) {
        this.io = io;
    },

    subscribe : function (core) {
        core.on('plugin.afterInit', this.afterInit.bind(this));
    },

    roomSockets : function () {
        return this.io.sockets.in('savetime');
    },

    afterInit : function(core) {
        var self = this;

        core.service.output.on('on', function () {
            self.roomSockets().emit('serviceState','on');
        });

        core.service.output.on('off', function () {
            self.roomSockets().emit('serviceState','off');
        });

        core.billing.output.on('on', function () {
            self.roomSockets().emit('billingState','on');
        });

        core.billing.output.on('off', function () {
            self.roomSockets().emit('billingState','off');
        });

        core.account.on('empty', function () {
            self.roomSockets().emit('accountNonempty', false);
        });

        core.account.on('nonempty', function () {
            self.roomSockets().emit('accountNonempty', true);
        });

        core.account.on('change', function (value) {
            self.roomSockets().emit('accountValue', value);
        });
    }
});