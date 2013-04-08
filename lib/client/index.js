var ko = require('knockout');
var VM = require('./vm');

var vm = new VM();
ko.applyBindings(vm);

var sock = io.connect();

sock.on('connect', function() {
    vm.online(true);
});

sock.on('disconnect', function() {
    vm.online(false);
});

sock.on('billingState', function(state) {
    vm.billingState(state);
});

sock.on('serviceState', function(state) {
    vm.serviceState(state);
});

sock.on('accountValue', function(state) {
    vm.accountValue(state);
});

vm.onPauseClick = function () {
    sock.emit('pause');
};

vm.onResumeClick = function () {
    sock.emit('resume');
};