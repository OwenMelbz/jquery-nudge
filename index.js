module.exports = function (message) {

    if (typeof jQuery == 'undefined') {
        throw 'jQuery 3+ is required.';
    }

    let config = {
        message: 'This is a nudge',
        wait: 3000, // how long to sit on the screen
        delay: 100, // how long to wait before initiating
        kill: 4500, // how long before removing the element
        noCss: false,
        debug: false
    };

    if (typeof message == 'object') {
        jQuery.extend(config, message);
    } else {
        config.message = message;
    }

    const debugLog = function (message) {
        if (config.debug) {
            console.log('nudge :: ', message);
        }
    }

    debugLog(config);

    if (this.nudging) {
        debugLog(jQuery('.jquery-nudge').length + ' already showing');

        clearTimeout(this.killSwitch);

        jQuery('.jquery-nudge').fadeOut(() => {
            jQuery(this).remove();
        });
    }

    this.nudging = true;

    let css = `
        <style scoped>

            .jquery-nudge {
                pointer-events: none;
                position: fixed;
                top: 50px;
                left: 50%;
                padding: 10px 20px;
                background: rgba(0, 0, 0, .7);
                border-radius: 25px;
                text-align: center;
                min-width: 120px;
                -webkit-box-shadow: 0px 0px 11px 0px rgba(255, 255, 255, .2);
                -moz-box-shadow: 0px 0px 11px 0px rgba(255, 255, 255, .2);
                box-shadow: 0px 0px 11px 0px rgba(255, 255, 255, .2);
            }

            .jquery-nudge span {
                font-size: 14px;
                color: #fff;
            }

            .jquery-nudge.start {
                transform: translate(-50%, 100vh);
            }

            .jquery-nudge.show {
                transition: all .4s ease-out;
                transform: translate(-50%, 70vh);
            }

            .jquery-nudge.finish {
                transition: all .5s ease;
                transform: translate(-50%, -200px);
            }

        </style>
    `;

    if (config.noCss) {
        css = '';
        debugLog('CSS has been disabled');
    }

    let element = jQuery(`
        <div class="jquery-nudge start">
            ${css}
            <span>${config.message}</span>
        </div>
    `);

    element.appendTo(
        jQuery('body')
    );

    debugLog('element has been created');
    debugLog(element);

    setTimeout(() => {
        debugLog('starting nudge');

        element
            .removeClass('start')
            .addClass('show')
    }, config.delay);

    setTimeout(() => {
        debugLog('nudge idled');

        element
            .removeClass('show')
            .addClass('finish')
    }, config.wait);

    this.killSwitch = setTimeout(() => {
        debugLog('nudge removed');
        jQuery('.jquery-nudge').remove();
        element = undefined;
        this.nudging = false;
    }, config.kill);

};