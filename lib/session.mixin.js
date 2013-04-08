var events = require('events');

function maybeDispatch(args) {
    var me = this;
    setTimeout(function() {
        try {
            me.processMessage(args);
        } catch (e) {}
    }, 0);
}

module.exports = function(obj) {
    obj.output = new events.EventEmitter();
    obj.maybeDispatch = maybeDispatch;
};