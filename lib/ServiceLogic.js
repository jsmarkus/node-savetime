var boop = require('boop');

var ServiceLogic = module.exports = boop.extend({
    IN_null : function (session, state, transition, msg) {
        console.log('Service IN:', state.name);
    },

    IN_switching_on : function (session, state, transition, msg) {
        console.log('Service IN:', state.name);
        this.doSwitchUp(function (error) {
            if(error) {
                session.maybeDispatch({msgId:'error'});
                return;
            }
            session.maybeDispatch({msgId:'up'});
        });
    },

    IN_on : function (session, state, transition, msg) {
        console.log('Service IN:', state.name);
        session.output.emit(state.name);
    },

    IN_switching_off : function (session, state, transition, msg) {
        console.log('Service IN:', state.name);
        this.doSwitchDown(function (error) {
            if(error) {
                session.maybeDispatch({msgId:'error'});
                return;
            }
            session.maybeDispatch({msgId:'down'});
        });
    },

    IN_off : function (session, state, transition, msg) {
        console.log('Service IN:', state.name);
        session.output.emit(state.name);
    },

    IN_broken : function (session, state, transition, msg) {
        console.log('Service IN:', state.name);
        session.output.emit(state.name);
    },

    doSwitchUp : function (next) {
        throw new Error('EABSTRACT');
    },

    doSwitchDown : function (next) {
        throw new Error('EABSTRACT');
    }
});