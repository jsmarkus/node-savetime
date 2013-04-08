var path = require('path');
var child_process = require('child_process');
var ServiceLogic = require('../ServiceLogic');

var SCRIPT_UP = path.resolve(__dirname + '/ufw/ufw-up.sh');
var SCRIPT_DOWN = path.resolve(__dirname + '/ufw/ufw-down.sh');


var ServiceLogic_Ufw = module.exports = ServiceLogic.extend({

    doSwitchUp : function (next) {
        child_process.exec(SCRIPT_UP, function (error, stdout, stderr) {
            if(error) {
                next(error);
                return;
            }
            next();
        });
    },

    doSwitchDown : function (next) {
        child_process.exec(SCRIPT_DOWN, function (error, stdout, stderr) {
            if(error) {
                next(error);
                return;
            }
            next();
        });
    }
});