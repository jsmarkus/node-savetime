var Savetime = require('./lib/Savetime');
var SavetimePluginSocketio = require('./lib/Savetime/PluginSocketio');

var serviceMachine = require('./lib/ServiceMachine');
// var ServiceLogic = require('./lib/ServiceLogic/Fake');
var ServiceLogic = require('./lib/ServiceLogic/Ufw');
serviceMachine.register(ServiceLogic);

var billingMachine = require('./lib/BillingMachine');
var BillingLogic = require('./lib/BillingLogic');
billingMachine.register(BillingLogic);

var Account = require('./lib/Account');

var svc = serviceMachine.create();
var blg = billingMachine.create();
var acc = new Account();

var server = require('./lib/server');

var socketioPlugin = new SavetimePluginSocketio(server.app.get('io'));

var core = new Savetime({
    service : svc,
    billing : blg,
    account : acc,
    timerInterval : 100,
    perMinutePrice : 20
}, [
    socketioPlugin
]);

core.run();


server.http.listen(3000);