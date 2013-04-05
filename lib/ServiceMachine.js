var automata = require('automata');
var events = require('events');
var ServiceLogic = require('./ServiceLogic');

automata.registerFSM({
    name  : 'Service',
    logic : ServiceLogic,

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
});

exports.create = function () {
    var session = automata.createSession('Service');
    session.output = new events.EventEmitter();
    return session;
};