var ko = require('knockout');

var O = ko.observable;
var A = ko.observableArray;
var C = ko.computed;

module.exports = function () {
    var vm = this;
    vm.online = O(false);
    vm.billingState = O('off');
    vm.serviceState = O('off');
    vm.accountValue = O(0);

    vm.offline = C(function () {
        return !vm.online();
    });
    vm.billingIsOff = C(function () {
        return vm.billingState() === 'off';
    });
    vm.billingIsOn = C(function () {
        return vm.billingState() === 'on';
    });
    vm.billingIsPaused = C(function () {
        return vm.billingState() === 'paused';
    });
    vm.serviceIsOff = C(function () {
        return vm.serviceState() === 'off';
    });
    vm.serviceIsOn = C(function () {
        return vm.serviceState() === 'on';
    });
    vm.accountValueReadable = C(function () {
        var val = vm.accountValue();
        if(val < 0) {
            return '00:00';
        }

        var minutes = Math.floor(val % 60);
        if(minutes <= 9) {
            minutes = '0'+minutes;
        }

        var hours = Math.floor(val / 60);
        if(hours <= 9) {
            hours = '0'+hours;
        } else if(hours === 0) {
            hours = '00';
        }

        return hours + ':' + minutes;
    });
};