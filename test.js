var serviceMachine = require('./lib/ServiceMachine');

var svc = serviceMachine.create();

svc.dispatch({msgId:'switch_on'});
setTimeout(function () {
    svc.dispatch({msgId:'switch_off'});
}, 3000);

svc.output.on('on', function () {
    console.log('Service is ON');
});

svc.output.on('off', function () {
    console.log('Service is OFF');
});

svc.output.on('broken', function () {
    console.log('Service is BROKEN');
});