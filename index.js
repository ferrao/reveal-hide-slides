/* jshint -W117 */
(function() {
    'use strict';

    var config = Reveal.getConfig().limits;

    if (!config || !config.path) {
        return;
    }

    loadScript('plugin/hide-slides/nanoajax.js', 'script', function() {

        nanoajax.ajax({
            url: config.path
        }, function(code, response) {

            var limits = JSON.parse(response);

            console.log('Configured limits are: ' + limits.h + '/' + limits.v);
            Reveal.addEventListener('slidechanged', function(event) {

                if ((limits.h && event.indexh > limits.h - 1) || (limits.v && event.indexv > limits.v - 1)) {

                    console.log('You can not go further than ' + (limits.h ? limits.h : '-') + '/' + (limits.v ? limits.v : '-'));
                    Reveal.slide(limits.h ? limits.h - 1 : event.indexh, limits.v ? limits.v - 1 : event.indexv);

                }

            });

        });

    });

    // modified from math plugin
    function loadScript(url, type, callback) {

        var head = document.querySelector('head');
        var resource = document.createElement('script');
        resource.type = 'text/javascript';
        resource.src = url;

        // Wrapper for callback to make sure it only fires once
        var finish = function() {
            if (typeof callback === 'function') {
                callback.call();
                callback = null;
            }
        };

        resource.onload = finish;

        // IE
        resource.onreadystatechange = function() {
            if (this.readyState === 'loaded') {
                finish();
            }
        };

        // Normal browsers
        head.appendChild(resource);
    }

}());
