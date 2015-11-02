(function($) {
    $.fn.fciframe = function(options) {
        var iframeOffsetTop;
        var timer;
        var loaderStyle;
        var isWebkit = 'webkitConvertPointFromNodeToPage' in window;
        var sourceURL;
        var thisObject = this;
        var frameID = thisObject.attr('id')

        // Loading default settings
        var settings = $.extend({
            clientName: "default_small",
            defaultURL: "Oversigt.html",
            loaderStyle: 'loader2',
            loaderColor: '#006fb0',
            loaderBgColor: '255,255,255',
            params: {},
            responsive: true
        }, options);

        // loaderColor function supporting multiple colors
        var values = settings.loaderColor.split(",");
        if (settings.loaderColor.charAt(0) == "#") {
            loaderColor = hexToR(settings.loaderColor) + ',' + hexToG(settings.loaderColor) + ',' + hexToB(settings.loaderColor);
        } else if (values.length == 2) {
            loaderColor = settings.loaderColor;
        } else if (values.length >= 3) {
            loaderColor = settings.loaderColor;
        } else {
            loaderColor = hexToR('#006fb0') + ',' + hexToG('#006fb0') + ',' + hexToB('#006fb0');
        }

        function hexToR(h) {
            return parseInt((cutHex(h)).substring(0, 2), 16)
        }

        function hexToG(h) {
            return parseInt((cutHex(h)).substring(2, 4), 16)
        }

        function hexToB(h) {
            return parseInt((cutHex(h)).substring(4, 6), 16)
        }

        function cutHex(h) {
            return (h.charAt(0) == "#") ? h.substring(1, 7) : h
        }

        // loaderStyle function supporting multiple loader styles based on http://projects.lukehaas.me/css-loaders/
        switch (settings.loaderStyle) {
            case 'loader1':
                loaderStyle = '.loader,.loader:before,.loader:after {background: rgba(' + loaderColor + ',1);-webkit-animation: load1 1s infinite ease-in-out;animation: load1 1s infinite ease-in-out;width: 1em;height: 4em;}.loader:before,.loader:after {position: absolute;top: 0;content: "";}.loader:before {left: -1.5em;-webkit-animation-delay: -0.32s;animation-delay: -0.32s;}.loader {text-indent: -9999em;margin: 88px auto;position: relative;font-size: 11px;-webkit-transform: translateZ(0);-ms-transform: translateZ(0);transform: translateZ(0);-webkit-animation-delay: -0.16s;animation-delay: -0.16s;}.loader:after {left: 1.5em;}@-webkit-keyframes load1 {0%,80%,100% {box-shadow: 0 0 rgba(' + loaderColor + ',1);height: 4em;}40% {box-shadow: 0 -2em rgba(' + loaderColor + ',1);height: 5em;}}@keyframes load1 {0%,80%,100% {box-shadow: 0 0 rgba(' + loaderColor + ',1);height: 4em;}40% {box-shadow: 0 -2em rgba(' + loaderColor + ',1);height: 5em;}}';
                break;
            case 'loader2':
                loaderStyle = '.loader,.loader:before,.loader:after {border-radius: 50%;}.loader:before,.loader:after {position: absolute;content: "";}.loader:before {width: 5.2em;height: 10.2em;background: rgba(' + settings.loaderBgColor + ',1);border-radius: 10.2em 0 0 10.2em;top: -0.1em;left: -0.1em;-webkit-transform-origin: 5.2em 5.1em;transform-origin: 5.2em 5.1em;-webkit-animation: load2 2s infinite ease 1.5s;animation: load2 2s infinite ease 1.5s;}.loader {font-size: 11px;text-indent: -99999em;margin: 55px auto;position: relative;width: 10em;height: 10em;box-shadow: inset 0 0 0 1em rgba(' + loaderColor + ',1);-webkit-transform: translateZ(0);-ms-transform: translateZ(0);transform: translateZ(0);}.loader:after {width: 5.2em;height: 10.2em;background: rgba(' + settings.loaderBgColor + ',1);border-radius: 0 10.2em 10.2em 0;top: -0.1em;left: 5.1em;-webkit-transform-origin: 0px 5.1em;transform-origin: 0px 5.1em;-webkit-animation: load2 2s infinite ease;animation: load2 2s infinite ease;}@-webkit-keyframes load2 {0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}}@keyframes load2 {0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}}';
                break;
            case 'loader3':
                loaderStyle = '.loader {font-size: 10px;margin: 50px auto;text-indent: -9999em;width: 11em;height: 11em;border-radius: 50%;background: rgba(' + loaderColor + ',1);background: -moz-linear-gradient(left, rgba(' + loaderColor + ',1) 10%, rgba(' + loaderColor + ',0) 42%);background: -webkit-linear-gradient(left, rgba(' + loaderColor + ',1) 10%, rgba(' + loaderColor + ',0) 42%);background: -o-linear-gradient(left, rgba(' + loaderColor + ',1) 10%, rgba(' + loaderColor + ',0) 42%);background: -ms-linear-gradient(left, rgba(' + loaderColor + ',1) 10%, rgba(' + loaderColor + ',0) 42%);background: linear-gradient(to right, rgba(' + loaderColor + ',1) 10%, rgba(' + loaderColor + ',0) 42%);position: relative;-webkit-animation: load3 1.4s infinite linear;animation: load3 1.4s infinite linear;-webkit-transform: translateZ(0);-ms-transform: translateZ(0);transform: translateZ(0);}.loader:before {background: rgba(' + loaderColor + ',1);width: 50%;height: 50%;border-radius: 100% 0 0 0;position: absolute;top: 0;left: 0;content: "";}.loader:after {background: rgba(' + settings.loaderBgColor + ',1);width: 75%;height: 75%;border-radius: 50%;content: "";margin: auto;position: absolute;top: 0;left: 0;bottom: 0;right: 0;}@-webkit-keyframes load3 {0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}}@keyframes load3 {0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}}';
                break;
            case 'loader4':
                loaderStyle = '.loader {font-size: 20px;margin: 100px auto;width: 1em;height: 1em;border-radius: 50%;position: relative;text-indent: -9999em;-webkit-animation: load4 1.3s infinite linear;animation: load4 1.3s infinite linear;-webkit-transform: translateZ(0);-ms-transform: translateZ(0);transform: translateZ(0);}@-webkit-keyframes load4 {0%,100% {box-shadow: 0 -3em 0 0.2em rgba(' + loaderColor + ',1), 2em -2em 0 0em rgba(' + loaderColor + ',1), 3em 0 0 -1em rgba(' + loaderColor + ',1), 2em 2em 0 -1em rgba(' + loaderColor + ',1), 0 3em 0 -1em rgba(' + loaderColor + ',1), -2em 2em 0 -1em rgba(' + loaderColor + ',1), -3em 0 0 -1em rgba(' + loaderColor + ',1), -2em -2em 0 0 rgba(' + loaderColor + ',1);}12.5% {box-shadow: 0 -3em 0 0 rgba(' + loaderColor + ',1), 2em -2em 0 0.2em rgba(' + loaderColor + ',1), 3em 0 0 0 rgba(' + loaderColor + ',1), 2em 2em 0 -1em rgba(' + loaderColor + ',1), 0 3em 0 -1em rgba(' + loaderColor + ',1), -2em 2em 0 -1em rgba(' + loaderColor + ',1), -3em 0 0 -1em rgba(' + loaderColor + ',1), -2em -2em 0 -1em rgba(' + loaderColor + ',1);}25% {box-shadow: 0 -3em 0 -0.5em rgba(' + loaderColor + ',1), 2em -2em 0 0 rgba(' + loaderColor + ',1), 3em 0 0 0.2em rgba(' + loaderColor + ',1), 2em 2em 0 0 rgba(' + loaderColor + ',1), 0 3em 0 -1em rgba(' + loaderColor + ',1), -2em 2em 0 -1em rgba(' + loaderColor + ',1), -3em 0 0 -1em rgba(' + loaderColor + ',1), -2em -2em 0 -1em rgba(' + loaderColor + ',1);}37.5% {box-shadow: 0 -3em 0 -1em rgba(' + loaderColor + ',1), 2em -2em 0 -1em rgba(' + loaderColor + ',1), 3em 0em 0 0 rgba(' + loaderColor + ',1), 2em 2em 0 0.2em rgba(' + loaderColor + ',1), 0 3em 0 0em rgba(' + loaderColor + ',1), -2em 2em 0 -1em rgba(' + loaderColor + ',1), -3em 0em 0 -1em rgba(' + loaderColor + ',1), -2em -2em 0 -1em rgba(' + loaderColor + ',1);}50% {box-shadow: 0 -3em 0 -1em rgba(' + loaderColor + ',1), 2em -2em 0 -1em rgba(' + loaderColor + ',1), 3em 0 0 -1em rgba(' + loaderColor + ',1), 2em 2em 0 0em rgba(' + loaderColor + ',1), 0 3em 0 0.2em rgba(' + loaderColor + ',1), -2em 2em 0 0 rgba(' + loaderColor + ',1), -3em 0em 0 -1em rgba(' + loaderColor + ',1), -2em -2em 0 -1em rgba(' + loaderColor + ',1);}62.5% {box-shadow: 0 -3em 0 -1em rgba(' + loaderColor + ',1), 2em -2em 0 -1em rgba(' + loaderColor + ',1), 3em 0 0 -1em rgba(' + loaderColor + ',1), 2em 2em 0 -1em rgba(' + loaderColor + ',1), 0 3em 0 0 rgba(' + loaderColor + ',1), -2em 2em 0 0.2em rgba(' + loaderColor + ',1), -3em 0 0 0 rgba(' + loaderColor + ',1), -2em -2em 0 -1em rgba(' + loaderColor + ',1);}75% {box-shadow: 0em -3em 0 -1em rgba(' + loaderColor + ',1), 2em -2em 0 -1em rgba(' + loaderColor + ',1), 3em 0em 0 -1em rgba(' + loaderColor + ',1), 2em 2em 0 -1em rgba(' + loaderColor + ',1), 0 3em 0 -1em rgba(' + loaderColor + ',1), -2em 2em 0 0 rgba(' + loaderColor + ',1), -3em 0em 0 0.2em rgba(' + loaderColor + ',1), -2em -2em 0 0 rgba(' + loaderColor + ',1);}87.5% {box-shadow: 0em -3em 0 0 rgba(' + loaderColor + ',1), 2em -2em 0 -1em rgba(' + loaderColor + ',1), 3em 0 0 -1em rgba(' + loaderColor + ',1), 2em 2em 0 -1em rgba(' + loaderColor + ',1), 0 3em 0 -1em rgba(' + loaderColor + ',1), -2em 2em 0 0 rgba(' + loaderColor + ',1), -3em 0em 0 0 rgba(' + loaderColor + ',1), -2em -2em 0 0.2em rgba(' + loaderColor + ',1);}}@keyframes load4 {0%,100% {box-shadow: 0 -3em 0 0.2em rgba(' + loaderColor + ',1), 2em -2em 0 0em rgba(' + loaderColor + ',1), 3em 0 0 -1em rgba(' + loaderColor + ',1), 2em 2em 0 -1em rgba(' + loaderColor + ',1), 0 3em 0 -1em rgba(' + loaderColor + ',1), -2em 2em 0 -1em rgba(' + loaderColor + ',1), -3em 0 0 -1em rgba(' + loaderColor + ',1), -2em -2em 0 0 rgba(' + loaderColor + ',1);}12.5% {box-shadow: 0 -3em 0 0 rgba(' + loaderColor + ',1), 2em -2em 0 0.2em rgba(' + loaderColor + ',1), 3em 0 0 0 rgba(' + loaderColor + ',1), 2em 2em 0 -1em rgba(' + loaderColor + ',1), 0 3em 0 -1em rgba(' + loaderColor + ',1), -2em 2em 0 -1em rgba(' + loaderColor + ',1), -3em 0 0 -1em rgba(' + loaderColor + ',1), -2em -2em 0 -1em rgba(' + loaderColor + ',1);}25% {box-shadow: 0 -3em 0 -0.5em rgba(' + loaderColor + ',1), 2em -2em 0 0 rgba(' + loaderColor + ',1), 3em 0 0 0.2em rgba(' + loaderColor + ',1), 2em 2em 0 0 rgba(' + loaderColor + ',1), 0 3em 0 -1em rgba(' + loaderColor + ',1), -2em 2em 0 -1em rgba(' + loaderColor + ',1), -3em 0 0 -1em rgba(' + loaderColor + ',1), -2em -2em 0 -1em rgba(' + loaderColor + ',1);}37.5% {box-shadow: 0 -3em 0 -1em rgba(' + loaderColor + ',1), 2em -2em 0 -1em rgba(' + loaderColor + ',1), 3em 0em 0 0 rgba(' + loaderColor + ',1), 2em 2em 0 0.2em rgba(' + loaderColor + ',1), 0 3em 0 0em rgba(' + loaderColor + ',1), -2em 2em 0 -1em rgba(' + loaderColor + ',1), -3em 0em 0 -1em rgba(' + loaderColor + ',1), -2em -2em 0 -1em rgba(' + loaderColor + ',1);}50% {box-shadow: 0 -3em 0 -1em rgba(' + loaderColor + ',1), 2em -2em 0 -1em rgba(' + loaderColor + ',1), 3em 0 0 -1em rgba(' + loaderColor + ',1), 2em 2em 0 0em rgba(' + loaderColor + ',1), 0 3em 0 0.2em rgba(' + loaderColor + ',1), -2em 2em 0 0 rgba(' + loaderColor + ',1), -3em 0em 0 -1em rgba(' + loaderColor + ',1), -2em -2em 0 -1em rgba(' + loaderColor + ',1);}62.5% {box-shadow: 0 -3em 0 -1em rgba(' + loaderColor + ',1), 2em -2em 0 -1em rgba(' + loaderColor + ',1), 3em 0 0 -1em rgba(' + loaderColor + ',1), 2em 2em 0 -1em rgba(' + loaderColor + ',1), 0 3em 0 0 rgba(' + loaderColor + ',1), -2em 2em 0 0.2em rgba(' + loaderColor + ',1), -3em 0 0 0 rgba(' + loaderColor + ',1), -2em -2em 0 -1em rgba(' + loaderColor + ',1);}75% {box-shadow: 0em -3em 0 -1em rgba(' + loaderColor + ',1), 2em -2em 0 -1em rgba(' + loaderColor + ',1), 3em 0em 0 -1em rgba(' + loaderColor + ',1), 2em 2em 0 -1em rgba(' + loaderColor + ',1), 0 3em 0 -1em rgba(' + loaderColor + ',1), -2em 2em 0 0 rgba(' + loaderColor + ',1), -3em 0em 0 0.2em rgba(' + loaderColor + ',1), -2em -2em 0 0 rgba(' + loaderColor + ',1);}87.5% {box-shadow: 0em -3em 0 0 rgba(' + loaderColor + ',1), 2em -2em 0 -1em rgba(' + loaderColor + ',1), 3em 0 0 -1em rgba(' + loaderColor + ',1), 2em 2em 0 -1em rgba(' + loaderColor + ',1), 0 3em 0 -1em rgba(' + loaderColor + ',1), -2em 2em 0 0 rgba(' + loaderColor + ',1), -3em 0em 0 0 rgba(' + loaderColor + ',1), -2em -2em 0 0.2em rgba(' + loaderColor + ',1);}}';
                break;
            case 'loader5':
                loaderStyle = '.loader {margin: 100px auto;font-size: 25px;width: 1em;height: 1em;border-radius: 50%;position: relative;text-indent: -9999em;-webkit-animation: load5 1.1s infinite ease;animation: load5 1.1s infinite ease;-webkit-transform: translateZ(0);-ms-transform: translateZ(0);transform: translateZ(0);}@-webkit-keyframes load5 {0%,100% {box-shadow: 0em -2.6em 0em 0em rgba(' + loaderColor + ', 1), 1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2), 2.5em 0em 0 0em rgba(' + loaderColor + ', 0.2), 1.75em 1.75em 0 0em rgba(' + loaderColor + ', 0.2), 0em 2.5em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em 1.8em 0 0em rgba(' + loaderColor + ', 0.2), -2.6em 0em 0 0em rgba(' + loaderColor + ', 0.5), -1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.7);}12.5% {box-shadow: 0em -2.6em 0em 0em rgba(' + loaderColor + ', 0.7), 1.8em -1.8em 0 0em rgba(' + loaderColor + ', 1), 2.5em 0em 0 0em rgba(' + loaderColor + ', 0.2), 1.75em 1.75em 0 0em rgba(' + loaderColor + ', 0.2), 0em 2.5em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em 1.8em 0 0em rgba(' + loaderColor + ', 0.2), -2.6em 0em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.5);}25% {box-shadow: 0em -2.6em 0em 0em rgba(' + loaderColor + ', 0.5), 1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.7), 2.5em 0em 0 0em rgba(' + loaderColor + ', 1), 1.75em 1.75em 0 0em rgba(' + loaderColor + ', 0.2), 0em 2.5em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em 1.8em 0 0em rgba(' + loaderColor + ', 0.2), -2.6em 0em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2);}37.5% {box-shadow: 0em -2.6em 0em 0em rgba(' + loaderColor + ', 0.2), 1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.5), 2.5em 0em 0 0em rgba(' + loaderColor + ', 0.7), 1.75em 1.75em 0 0em rgba(' + loaderColor + ', 0.2), 0em 2.5em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em 1.8em 0 0em rgba(' + loaderColor + ', 0.2), -2.6em 0em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2);}50% {box-shadow: 0em -2.6em 0em 0em rgba(' + loaderColor + ', 0.2), 1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2), 2.5em 0em 0 0em rgba(' + loaderColor + ', 0.5), 1.75em 1.75em 0 0em rgba(' + loaderColor + ', 0.7), 0em 2.5em 0 0em rgba(' + loaderColor + ', 1), -1.8em 1.8em 0 0em rgba(' + loaderColor + ', 0.2), -2.6em 0em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2);}62.5% {box-shadow: 0em -2.6em 0em 0em rgba(' + loaderColor + ', 0.2), 1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2), 2.5em 0em 0 0em rgba(' + loaderColor + ', 0.2), 1.75em 1.75em 0 0em rgba(' + loaderColor + ', 0.5), 0em 2.5em 0 0em rgba(' + loaderColor + ', 0.7), -1.8em 1.8em 0 0em rgba(' + loaderColor + ', 1), -2.6em 0em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2);}75% {box-shadow: 0em -2.6em 0em 0em rgba(' + loaderColor + ', 0.2), 1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2), 2.5em 0em 0 0em rgba(' + loaderColor + ', 0.2), 1.75em 1.75em 0 0em rgba(' + loaderColor + ', 0.2), 0em 2.5em 0 0em rgba(' + loaderColor + ', 0.5), -1.8em 1.8em 0 0em rgba(' + loaderColor + ', 0.7), -2.6em 0em 0 0em rgba(' + loaderColor + ', 1), -1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2);}87.5% {box-shadow: 0em -2.6em 0em 0em rgba(' + loaderColor + ', 0.2), 1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2), 2.5em 0em 0 0em rgba(' + loaderColor + ', 0.2), 1.75em 1.75em 0 0em rgba(' + loaderColor + ', 0.2), 0em 2.5em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em 1.8em 0 0em rgba(' + loaderColor + ', 0.5), -2.6em 0em 0 0em rgba(' + loaderColor + ', 0.7), -1.8em -1.8em 0 0em rgba(' + loaderColor + ', 1);}}@keyframes load5 {0%,100% {box-shadow: 0em -2.6em 0em 0em rgba(' + loaderColor + ', 1), 1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2), 2.5em 0em 0 0em rgba(' + loaderColor + ', 0.2), 1.75em 1.75em 0 0em rgba(' + loaderColor + ', 0.2), 0em 2.5em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em 1.8em 0 0em rgba(' + loaderColor + ', 0.2), -2.6em 0em 0 0em rgba(' + loaderColor + ', 0.5), -1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.7);}12.5% {box-shadow: 0em -2.6em 0em 0em rgba(' + loaderColor + ', 0.7), 1.8em -1.8em 0 0em rgba(' + loaderColor + ', 1), 2.5em 0em 0 0em rgba(' + loaderColor + ', 0.2), 1.75em 1.75em 0 0em rgba(' + loaderColor + ', 0.2), 0em 2.5em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em 1.8em 0 0em rgba(' + loaderColor + ', 0.2), -2.6em 0em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.5);}25% {box-shadow: 0em -2.6em 0em 0em rgba(' + loaderColor + ', 0.5), 1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.7), 2.5em 0em 0 0em rgba(' + loaderColor + ', 1), 1.75em 1.75em 0 0em rgba(' + loaderColor + ', 0.2), 0em 2.5em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em 1.8em 0 0em rgba(' + loaderColor + ', 0.2), -2.6em 0em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2);}37.5% {box-shadow: 0em -2.6em 0em 0em rgba(' + loaderColor + ', 0.2), 1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.5), 2.5em 0em 0 0em rgba(' + loaderColor + ', 0.7), 1.75em 1.75em 0 0em rgba(' + loaderColor + ', 0.2), 0em 2.5em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em 1.8em 0 0em rgba(' + loaderColor + ', 0.2), -2.6em 0em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2);}50% {box-shadow: 0em -2.6em 0em 0em rgba(' + loaderColor + ', 0.2), 1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2), 2.5em 0em 0 0em rgba(' + loaderColor + ', 0.5), 1.75em 1.75em 0 0em rgba(' + loaderColor + ', 0.7), 0em 2.5em 0 0em rgba(' + loaderColor + ', 1), -1.8em 1.8em 0 0em rgba(' + loaderColor + ', 0.2), -2.6em 0em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2);}62.5% {box-shadow: 0em -2.6em 0em 0em rgba(' + loaderColor + ', 0.2), 1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2), 2.5em 0em 0 0em rgba(' + loaderColor + ', 0.2), 1.75em 1.75em 0 0em rgba(' + loaderColor + ', 0.5), 0em 2.5em 0 0em rgba(' + loaderColor + ', 0.7), -1.8em 1.8em 0 0em rgba(' + loaderColor + ', 1), -2.6em 0em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2);}75% {box-shadow: 0em -2.6em 0em 0em rgba(' + loaderColor + ', 0.2), 1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2), 2.5em 0em 0 0em rgba(' + loaderColor + ', 0.2), 1.75em 1.75em 0 0em rgba(' + loaderColor + ', 0.2), 0em 2.5em 0 0em rgba(' + loaderColor + ', 0.5), -1.8em 1.8em 0 0em rgba(' + loaderColor + ', 0.7), -2.6em 0em 0 0em rgba(' + loaderColor + ', 1), -1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2);}87.5% {box-shadow: 0em -2.6em 0em 0em rgba(' + loaderColor + ', 0.2), 1.8em -1.8em 0 0em rgba(' + loaderColor + ', 0.2), 2.5em 0em 0 0em rgba(' + loaderColor + ', 0.2), 1.75em 1.75em 0 0em rgba(' + loaderColor + ', 0.2), 0em 2.5em 0 0em rgba(' + loaderColor + ', 0.2), -1.8em 1.8em 0 0em rgba(' + loaderColor + ', 0.5), -2.6em 0em 0 0em rgba(' + loaderColor + ', 0.7), -1.8em -1.8em 0 0em rgba(' + loaderColor + ', 1);}}';
                break;
            case 'loader6':
                loaderStyle = '.loader {font-size: 90px;text-indent: -9999em;overflow: hidden;width: 1em;height: 1em;border-radius: 50%;margin: 72px auto;position: relative;-webkit-transform: translateZ(0);-ms-transform: translateZ(0);transform: translateZ(0);-webkit-animation: load6 1.7s infinite ease;animation: load6 1.7s infinite ease;}@-webkit-keyframes load6 {0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);box-shadow: 0 -0.83em 0 -0.4em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.42em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.44em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.46em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.477em rgba(' + loaderColor + ',1);}5%,95% {box-shadow: 0 -0.83em 0 -0.4em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.42em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.44em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.46em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.477em rgba(' + loaderColor + ',1);}10%,59% {box-shadow: 0 -0.83em 0 -0.4em rgba(' + loaderColor + ',1), -0.087em -0.825em 0 -0.42em rgba(' + loaderColor + ',1), -0.173em -0.812em 0 -0.44em rgba(' + loaderColor + ',1), -0.256em -0.789em 0 -0.46em rgba(' + loaderColor + ',1), -0.297em -0.775em 0 -0.477em rgba(' + loaderColor + ',1);}20% {box-shadow: 0 -0.83em 0 -0.4em rgba(' + loaderColor + ',1), -0.338em -0.758em 0 -0.42em rgba(' + loaderColor + ',1), -0.555em -0.617em 0 -0.44em rgba(' + loaderColor + ',1), -0.671em -0.488em 0 -0.46em rgba(' + loaderColor + ',1), -0.749em -0.34em 0 -0.477em rgba(' + loaderColor + ',1);}38% {box-shadow: 0 -0.83em 0 -0.4em rgba(' + loaderColor + ',1), -0.377em -0.74em 0 -0.42em rgba(' + loaderColor + ',1), -0.645em -0.522em 0 -0.44em rgba(' + loaderColor + ',1), -0.775em -0.297em 0 -0.46em rgba(' + loaderColor + ',1), -0.82em -0.09em 0 -0.477em rgba(' + loaderColor + ',1);}100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);box-shadow: 0 -0.83em 0 -0.4em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.42em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.44em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.46em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.477em rgba(' + loaderColor + ',1);}}@keyframes load6 {0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);box-shadow: 0 -0.83em 0 -0.4em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.42em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.44em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.46em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.477em rgba(' + loaderColor + ',1);}5%,95% {box-shadow: 0 -0.83em 0 -0.4em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.42em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.44em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.46em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.477em rgba(' + loaderColor + ',1);}10%,59% {box-shadow: 0 -0.83em 0 -0.4em rgba(' + loaderColor + ',1), -0.087em -0.825em 0 -0.42em rgba(' + loaderColor + ',1), -0.173em -0.812em 0 -0.44em rgba(' + loaderColor + ',1), -0.256em -0.789em 0 -0.46em rgba(' + loaderColor + ',1), -0.297em -0.775em 0 -0.477em rgba(' + loaderColor + ',1);}20% {box-shadow: 0 -0.83em 0 -0.4em rgba(' + loaderColor + ',1), -0.338em -0.758em 0 -0.42em rgba(' + loaderColor + ',1), -0.555em -0.617em 0 -0.44em rgba(' + loaderColor + ',1), -0.671em -0.488em 0 -0.46em rgba(' + loaderColor + ',1), -0.749em -0.34em 0 -0.477em rgba(' + loaderColor + ',1);}38% {box-shadow: 0 -0.83em 0 -0.4em rgba(' + loaderColor + ',1), -0.377em -0.74em 0 -0.42em rgba(' + loaderColor + ',1), -0.645em -0.522em 0 -0.44em rgba(' + loaderColor + ',1), -0.775em -0.297em 0 -0.46em rgba(' + loaderColor + ',1), -0.82em -0.09em 0 -0.477em rgba(' + loaderColor + ',1);}100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);box-shadow: 0 -0.83em 0 -0.4em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.42em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.44em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.46em rgba(' + loaderColor + ',1), 0 -0.83em 0 -0.477em rgba(' + loaderColor + ',1);}}';
                break;
            case 'loader7':
                loaderStyle = '.loader:before,.loader:after,.loader {border-radius: 50%;width: 2.5em;height: 2.5em;-webkit-animation-fill-mode: both;animation-fill-mode: both;-webkit-animation: load7 1.8s infinite ease-in-out;animation: load7 1.8s infinite ease-in-out;}.loader {margin: 8em auto;font-size: 10px;position: relative;text-indent: -9999em;-webkit-transform: translateZ(0);-ms-transform: translateZ(0);transform: translateZ(0);-webkit-animation-delay: -0.16s;animation-delay: -0.16s;}.loader:before {left: -3.5em;-webkit-animation-delay: -0.32s;animation-delay: -0.32s;}.loader:after {left: 3.5em;}.loader:before, .loader:after {content: "";position: absolute;top: 0;} @-webkit-keyframes load7 {0%,80%, 100% {box-shadow: 0 2.5em 0 -1.3em ' + settings.loaderColor + ';} 40% {box-shadow: 0 2.5em 0 0 ' + settings.loaderColor + ';}} @keyframes load7 {0%,80%, 100% {box-shadow: 0 2.5em 0 -1.3em ' + settings.loaderColor + ';}40% {box-shadow: 0 2.5em 0 0 ' + settings.loaderColor + ';}};'
                break;
            case 'loader8':
                loaderStyle = '.loader {margin: 60px auto;font-size: 10px;position: relative;text-indent: -9999em;border-top: 1.1em solid rgba(' + loaderColor + ',0.2);border-right: 1.1em solid rgba(' + loaderColor + ',0.2);border-bottom: 1.1em solid rgba(' + loaderColor + ',0.2);border-left: 1.1em solidrgba(' + loaderColor + ',1);-webkit-transform: translateZ(0);-ms-transform: translateZ(0);transform: translateZ(0);-webkit-animation: load8 1.1s infinite linear;animation: load8 1.1s infinite linear;}.loader,.loader:after {border-radius: 50%;width: 10em;height: 10em;}@-webkit-keyframes load8 {0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}}@keyframes load8 {0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}};'
                break;
        }

        // Building URL from parameters and loading frame
        if (!jQuery.isEmptyObject(settings.params)) {
            sourceURL = "//" + settings.clientName + ".gws.fcnws.com/" + settings.defaultURL + "?" + jQuery.param(settings.params);
        } else {
            sourceURL = "//" + settings.clientName + ".gws.fcnws.com/" + settings.defaultURL;
        }

        thisObject.attr("src", sourceURL).attr("width", "100%").attr("height", "0").attr("frameborder", "0").attr("scrolling", "no").hide();
        thisObject.load(function() {
            $('.loader').hide();
            thisObject.show();
            crossDomainMessage("isFramed~" + ("true"));
            $('html,body').animate({
                scrollTop: 0
            }, 500);
            iframeOffsetTop = thisObject.offset().top;
        });

        $('<div id="fc-loader" class="loader">Loading...</div>').insertBefore('iframe#' + frameID);
        $('head').append('<style type="text/css">' + loaderStyle + '</style>');

        // adding event listener to handle cross domain messages
        if (window.attachEvent) {
            window.attachEvent('onmessage', receiveMessage);
        } else if (window.addEventListener) {
            window.addEventListener('message', receiveMessage, false);
        }

        // triggering refresh function on scroll stop
        $(window).bind('scroll', function() {
            clearTimeout(timer);
            timer = setTimeout(refresh, 50);
        });

        // Allowing cross-domain messages (sending)
        function crossDomainMessage(message) {
            var ReferalUrl = "*";
            iframe = document.getElementById(frameID);
            if (window.postMessage && ReferalUrl != undefined) {
                iframe.contentWindow.postMessage(message, ReferalUrl);
            }
        };

        // Allowing cross-domain messages (recieving) - intentionlly allowing all referrer URLs
        function receiveMessage(event) {
            eventData = event.data + '';
            message = eventData.split("~");
            if (message[0] == 'slideTo') {
                $("html, body").animate({
                    scrollTop: (parseInt(message[1]) + iframeOffsetTop)
                }, 500);
            } else if (message[0] == 'resizeFrame') {
                if ((thisObject.height() != message[1])) {
                    thisObject.height(parseInt(message[1]) + 59);
                }
            } else {
                return;
            }
        };

        // Update display
        function refresh() {
            var scrollPosTop;
            if (isWebkit) scrollPosTop = $("body").scrollTop();
            else scrollPosTop = $("html,body").scrollTop(); if (scrollPosTop >= iframeOffsetTop) crossDomainMessage("OffsetFrameTo~" + (scrollPosTop - iframeOffsetTop - 1));
            else crossDomainMessage("OffsetFrameTo~" + (0));
        };
    };
}(jQuery));
