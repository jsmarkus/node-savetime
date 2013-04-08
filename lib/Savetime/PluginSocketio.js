var boop = require('boop');

var ROOM = 'savetime';

var PluginSocketio = module.exports = boop.extend({
    initialize : function (io) {
        this.io = io;

        this.initIo();
    },

    initIo : function () {
        var self = this;
        this.io.on('connection', function (sock) {
            sock.join(ROOM);
            self.dump(sock);
            sock.on('pause', self.onCommandPause.bind(self));
            sock.on('resume', self.onCommandResume.bind(self));
        });
    },

    onCommandPause : function () {
        this.core.billing.maybeDispatch({msgId:'pause'});
    },

    onCommandResume : function () {
        this.core.billing.maybeDispatch({msgId:'resume'});
    },

    dump : function (sock) {
        var core = this.core;
        var billingState = core.billing.getCurrentState().name;
        var serviceState = core.service.getCurrentState().name;
        var accountValue = core.account.get();

        sock.emit('billingState', billingState);
        sock.emit('serviceState', serviceState);
        sock.emit('accountValue', accountValue);
    },

    subscribe : function (core) {
        core.on('plugin.afterInit', this.afterInit.bind(this));
        this.core = core;
    },

    roomSockets : function () {
        return this.io.sockets.in(ROOM);
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

        core.billing.output.on('paused', function () {
            self.roomSockets().emit('billingState','paused');
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