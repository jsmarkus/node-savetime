var ko = require('knockout');

var O = ko.observable;
var A = ko.observableArray;
var C = ko.computed;

module.exports = function () {
    this.online = O(false);
    this.billingState = O('off');
    this.serviceState = O('off');
    this.accountValue = O(0);

    this.offline = C(function () {
        return !this.online();
    });
    this.billingIsOff = C(function () {
        return this.billingState() === 'off';
    });
    this.billingIsOn = C(function () {
        return this.billingState() === 'on';
    });
    this.serviceIsOff = C(function () {
        return this.serviceState() === 'off';
    });
    this.serviceIsOn = C(function () {
        return this.serviceState() === 'on';
    });
};