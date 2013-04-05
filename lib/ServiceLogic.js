var boop = require('boop');

var ServiceLogic = module.exports = boop.extend({
    IN_null : function (session, state, transition, msg) {
        console.log('IN:', state.name);
    },

    IN_switching_on : function (session, state, transition, msg) {
        console.log('IN:', state.name);
        this.doIfup(function (error) {
            if(error) {
                session.dispatch({msgId:'error'});
                return;
            }
            session.dispatch({msgId:'up'});
        });
    },

    IN_on : function (session, state, transition, msg) {
        console.log('IN:', state.name);
        session.output.emit(state.name);
    },

    IN_switching_off : function (session, state, transition, msg) {
        console.log('IN:', state.name);
        this.doIfdown(function (error) {
            if(error) {
                session.dispatch({msgId:'error'});
                return;
            }
            session.dispatch({msgId:'down'});
        });
    },

    IN_off : function (session, state, transition, msg) {
        console.log('IN:', state.name);
        session.output.emit(state.name);
    },

    IN_broken : function (session, state, transition, msg) {
        console.log('IN:', state.name);
        session.output.emit(state.name);
    },

    doIfup : function (next) {
        setTimeout(function () {
            next(null);
        }, 1000);
    },

    doIfdown : function (next) {
        setTimeout(function () {
            next(null);
        }, 1000);
    }
});