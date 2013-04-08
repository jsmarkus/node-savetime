var automata = require('automata');
var sessionMixin = require('./session.mixin');

var schema = exports.schema = {
    name  : 'Service',

    state : [
        {name :'null',          onEnter : 'IN_null', initial : true },
        {name :'switching_on',  onEnter : 'IN_switching_on'         },
        {name :'on',            onEnter : 'IN_on'                   },
        {name :'switching_off', onEnter : 'IN_switching_off'        },
        {name :'off',           onEnter : 'IN_off'                  },
        {name :'broken',        onEnter : 'IN_broken'               }
    ],

    transition : [
        {event : 'switch_on',  from : 'null',          to : 'switching_on' },
        {event : 'switch_off', from : 'null',          to : 'switching_off'},
        {event : 'up',         from : 'switching_on',  to : 'on'           },
        {event : 'switch_off', from : 'on',            to : 'switching_off'},
        {event : 'down',       from : 'switching_off', to : 'off'          },
        {event : 'switch_on',  from : 'off',           to : 'switching_on' },
        {event : 'error',      from : 'switching_on',  to : 'broken'       },
        {event : 'error',      from : 'switching_off', to : 'broken'       }
    ]
};

exports.register = function (logic) {
    var _schema = Object.create(schema);
    _schema.logic = logic;
    automata.registerFSM(_schema);
};

exports.create = function () {
    var session = automata.createSession('Service');
    sessionMixin(session);
    return session;
};