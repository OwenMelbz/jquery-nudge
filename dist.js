'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var nudge = function nudge(message) {
    var _this = this;

    var config = {
        message: 'This is a nudge',
        wait: 3000, // how long to sit on the screen
        delay: 100, // how long to wait before initiating
        kill: 4500, // how long before removing the element
        noCss: false,
        debug: false
    };

    if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) == 'object') {
        jQuery.extend(config, message);
    } else if (message) {
        config.message = message;
    }

    var debugLog = function debugLog(message) {
        if (config.debug) {
            console.log('nudge :: ', message);
        }
    };

    debugLog(config);

    if (jQuery('.jquery-nudge').length) {
        debugLog(jQuery('.jquery-nudge').length + ' already showing');

        clearTimeout(window.nudgekillSwitch);

        jQuery('.jquery-nudge').fadeOut(function () {
            jQuery(_this).remove();
        });
    }

    var css = '\n        <style scoped>\n            .jquery-nudge {\n                position: fixed;\n                top: 50px;\n                left: 50%;\n                z-index: 9999999;\n                min-width: 120px;\n                padding: 10px 20px;\n                border-radius: 25px;\n                background: rgba(0, 0, 0, .7);\n                text-align: center;\n                -webkit-box-shadow: 0px 0px 11px 0px rgba(255, 255, 255, .2);\n                -moz-box-shadow: 0px 0px 11px 0px rgba(255, 255, 255, .2);\n                box-shadow: 0px 0px 11px 0px rgba(255, 255, 255, .2);\n                pointer-events: none; }\n\n            .jquery-nudge span {\n                color: #fff;\n                font-size: 14px; }\n\n            .jquery-nudge.start {\n                transform: translate(-50%, 100vh); }\n\n            .jquery-nudge.show {\n                transition: all .4s ease-out;\n                transform: translate(-50%, 70vh); }\n\n            .jquery-nudge.finish {\n                transition: all .5s ease;\n                transform: translate(-50%, -200px); }\n        </style>\n    ';

    if (config.noCss) {
        css = '';
        debugLog('CSS has been disabled');
    }

    var element = jQuery('\n        <div class="jquery-nudge start">\n            ' + css + '\n            <span>' + config.message + '</span>\n        </div>\n    ');

    element.appendTo(jQuery('body'));

    debugLog('element has been created');
    debugLog(element);

    setTimeout(function () {
        debugLog('starting nudge');

        element.removeClass('start').addClass('show');
    }, config.delay);

    setTimeout(function () {
        debugLog('nudge idled');

        element.removeClass('show').addClass('finish');
    }, config.wait);

    window.nudgekillSwitch = setTimeout(function () {
        debugLog('nudge removed');
        jQuery('.jquery-nudge').remove();
        element = undefined;
    }, config.kill);
};

module.exports = nudge;
