var boop = require('boop');
var events = require('events');

var Account = module.exports = boop.extend({
    initialize : function () {
        this.value = 0;
        this.isEmpty = null;
    },
    set : function (value) {
        value = +value;
        isEmpty = value <= 0;
        if (isEmpty!==this.isEmpty) {
            if(isEmpty) {
                this.emit('empty');
            } else {
                this.emit('nonempty');
            }
        }
        this.isEmpty = isEmpty;
        this.value = value;
    },
    get : function () {
        return this.value;
    },
    charge : function (value) {
        this.set(this.get() + value);
    },
    spend : function (value) {
        this.set(this.get() - value);
    }
})
.mixin(events.EventEmitter.prototype);