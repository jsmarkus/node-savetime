var boop = require('boop');
var events = require('events');
var async = require('async');
var levelup = require('levelup');

var PluginAccount = module.exports = boop.extend({
    initialize : function (options) {
        // this.file = file;
        options = options || {};
        this.dailyCharge = +options.dailyCharge;
        this.db = levelup(options.file);
        this.startupLoadingDone = false;
    },

    def : function () {
        return {
            charged : new Date(1970, 0, 1, 0, 0, 0, 0),
            value : 0
        };
    },

    load : function () {
        var self = this;
        this.db.get('account', function (err, value) {
            //TODO handle error
            var data = self.unserialize(value);
            self.emit('load', data);
        });
    },

    save : function (data) {
        this.db.put('account', this.serialize(data));
    },

    unserialize : function (str) {
        if(!str || !str.length) {
            return this.def();
        } else {
            var obj = JSON.parse(str);
            obj.charged = new Date(obj.charged); //TODO check for empty
            return obj;
        }
    },

    serialize : function (data) {
        return JSON.stringify(data);
    },

    subscribe : function (core) {
        var self = this;
        core.on('plugin.run', function () {
            self.load();

            core.account.on('change', function () {
                self.load();
            });

        });

        self.on('load', function (data) {
            console.log(data);
            var today = new Date;
            today.setHours(12,0,0,0);
            console.log(+today);
            console.log(+data.charged);
            if(+data.charged !== +today) {
                //Has not been charged today
                console.log('Not charged today, charging');
                core.account.set(self.dailyCharge);
                data.value = self.dailyCharge;
                data.charged = today;
                self.save(data);
            } else {
                //Has already been charged today
                if(!self.startupLoadingDone) {
                    console.log('Startup account loading:', data.value);
                    core.account.set(data.value);
                } else {
                    data.value = core.account.get();
                    console.log('Saving account on change:', data.value);
                    this.save(data);
                }
            }
            self.startupLoadingDone = true;
        });

    }
}).mixin(events.EventEmitter.prototype);