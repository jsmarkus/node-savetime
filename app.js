var Savetime = require('./lib/Savetime');

var serviceMachine = require('./lib/ServiceMachine');
var ServiceLogic = require('./lib/ServiceLogic');
serviceMachine.register(ServiceLogic);

var billingMachine = require('./lib/BillingMachine');
var BillingLogic = require('./lib/BillingLogic');
billingMachine.register(BillingLogic);

var Account = require('./lib/Account');

var svc = serviceMachine.create();
var blg = billingMachine.create();
var acc = new Account();

var core = new Savetime({
    service : svc,
    billing : blg,
    account : acc,
    timerInterval : 6000,
    perMinutePrice : 1
});

core.run();