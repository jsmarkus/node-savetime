var boop = require('boop');
var events = require('events');

var MINUTE = 60000;

var Savetime = module.exports = boop.extend({

    initialize : function (options, plugins) {
        this.plugins = [];

        plugins = plugins || [];

        for (var i = 0; i < plugins.length; i++) {
            this.addPlugin(plugins[i]);
        }

        this.setService(options.service);
        this.setBilling(options.billing);
        this.setAccount(options.account);

        this.setTimerInterval(options.timerInterval);
        this.setPerMinutePrice(options.perMinutePrice);

        this.buildSubscriptions();
        this.emit('plugin.afterInit', this);
    },

    addPlugin : function (plugin) {
        this.plugins.push(plugin);
        plugin.subscribe(this);
    },

    setService : function (service) {
        this.service = service;
    },

    setBilling : function (billing) {
        this.billing = billing;
    },

    setAccount : function (account) {
        this.account = account;
    },

    setTimerInterval : function (ti) {
        this.timerInterval = +ti;
    },

    setPerMinutePrice : function (pmp) {
        this.perMinutePrice = +pmp;
    },

    buildSubscriptions : function () {
        var service = this.service;
        var billing = this.billing;
        var account = this.account;
        var savetime = this;

        //-------------Billing to Service:

        billing.output.on('off', function () {
            service.maybeDispatch({msgId : 'switch_off'});
        });

        billing.output.on('pause', function () {
            service.maybeDispatch({msgId : 'switch_off'});
        });

        billing.output.on('on', function () {
            service.maybeDispatch({msgId : 'switch_on'});
        });

        //-------------Service to Billing:

        service.output.on('on', function () {
            var billingState = billing.getCurrentState().name;
            if(billingState !== 'on') {
                service.maybeDispatch({msgId : 'switch_off'});
            }
        });

        service.output.on('off', function () {
            var billingState = billing.getCurrentState().name;
            if(billingState === 'on') {
                service.maybeDispatch({msgId : 'switch_on'});
            }
        });

        //-------------Account to billing

        account.on('nonempty', function () {
            console.log('nonempty');
            billing.maybeDispatch({msgId : 'balance_nonempty'});
        });

        account.on('empty', function () {
            console.log('empty');
            billing.maybeDispatch({msgId : 'balance_empty'});
        });
        //-------------Service to timer

        service.output.on('on', function () {
            savetime.startTimer();
        });

        service.output.on('off', function () {
            savetime.stopTimer();
        });
    },

    run : function () {
        this.account.set(10);
    },

    startTimer : function () {
        this.onTimerTick();
        this._timer = setInterval(this.onTimerTick.bind(this), this.timerInterval);
    },

    stopTimer : function () {
        clearInterval(this._timer);
    },

    onTimerTick : function () {
        if(this.service.getCurrentState().name === 'on') {
            this.account.spend(this.timerInterval / MINUTE * this.perMinutePrice);
            console.log(this.account.get());
        }
    }

}).mixin(events.EventEmitter.prototype);