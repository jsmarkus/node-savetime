var automata = require('automata');
var sessionMixin = require('./session.mixin');

var schema = exports.schema = {
    name  : 'Billing',

    state : [
        {name :'null',         onEnter : 'IN_null', initial : true},
        {name :'off',          onEnter : 'IN_off'                 },
        {name :'on',           onEnter : 'IN_on'                  },
        {name :'paused',       onEnter : 'IN_paused'              }
    ],

    transition : [
        // {event : 'start',            from : 'null',   to : 'off'   },
        {event : 'balance_nonempty', from : 'null',   to : 'on'    },
        {event : 'balance_empty',    from : 'null',   to : 'off'   },
        {event : 'balance_nonempty', from : 'off',    to : 'on'    },
        {event : 'balance_empty',    from : 'on',     to : 'off'   },
        {event : 'balance_empty',    from : 'paused', to : 'off'   },
        {event : 'pause',            from : 'on',     to : 'paused'},
        {event : 'resume',           from : 'paused', to : 'on'    }
    ]
};

exports.register = function (logic) {
    var _schema = Object.create(schema);
    _schema.logic = logic;
    automata.registerFSM(_schema);
};

exports.create = function () {
    var session = automata.createSession('Billing');
    sessionMixin(session);
    return session;
};