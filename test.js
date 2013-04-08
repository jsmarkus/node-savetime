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


//-------------Billing to Service mediator:
blg.output.on('off', function () {
    svc.maybeDispatch({msgId : 'switch_off'});
});
blg.output.on('pause', function () {
    svc.maybeDispatch({msgId : 'switch_off'});
});
blg.output.on('on', function () {
    svc.maybeDispatch({msgId : 'switch_on'});
});
//-------------Service to Billing mediator:
svc.output.on('on', function () {
    var billingState = blg.getCurrentState().name;
    if(billingState !== 'on') {
        svc.maybeDispatch({msgId : 'switch_off'});
    }
});
svc.output.on('off', function () {
    var billingState = blg.getCurrentState().name;
    if(billingState === 'on') {
        svc.maybeDispatch({msgId : 'switch_on'});
    }
});

//-------------Account to Billing mediator:
acc.on('nonempty', function () {
    console.log('nonempty');
    blg.maybeDispatch({msgId : 'balance_nonempty'});
});

acc.on('empty', function () {
    console.log('empty');
    blg.maybeDispatch({msgId : 'balance_empty'});
});

//---------------------------------------
blg.maybeDispatch({msgId:'start'});
acc.set(100);

setInterval(function () {
    if(svc.getCurrentState().name === 'on') {
        acc.spend(1);
        console.log(acc.get());
    }
}, 100);