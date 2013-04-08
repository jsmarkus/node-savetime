var boop = require('boop');

var BillingLogic = module.exports = boop.extend({
    IN_null : function (session, state, transition, msg) {
        console.log('Billing IN:', state.name);
    },
    IN_off : function (session, state, transition, msg) {
        console.log('Billing IN:', state.name);
        session.output.emit(state.name);
    },
    IN_on : function (session, state, transition, msg) {
        console.log('Billing IN:', state.name);
        session.output.emit(state.name);
    },
    IN_paused : function (session, state, transition, msg) {
        console.log('Billing IN:', state.name);
        session.output.emit(state.name);
    }
});