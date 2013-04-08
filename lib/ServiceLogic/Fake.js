var ServiceLogic = require('../ServiceLogic');

var ServiceLogic_Fake = module.exports = ServiceLogic.extend({

    doSwitchUp : function (next) {
        setTimeout(function () {
            next(null);
        }, 1000);
    },

    doSwitchDown : function (next) {
        setTimeout(function () {
            next(null);
        }, 1000);
    }
});