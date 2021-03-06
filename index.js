/* jshint -W117 */
(function() {
    'use strict';

    var config = Reveal.getConfig().limits;

    if (!config || (!config.path && !Array.isArray(config))) {
        return;
    }

    loadScript('plugin/hide-slides/nanoajax.js', 'script', function() {

        var path = config.path;

        if (Array.isArray(config)) {

            config.forEach(function(value) {
                if (window.location.href.search(value.filter) > 0) {
                    path = value.path;
                }
            });
        }

        if (path) {

            nanoajax.ajax({
                url: path,
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            }, function(code, response) {
                setLimits(JSON.parse(response));
            });

        }

    });

    function setLimits(limits) {
        var limitsText = (limits.h ? limits.h : '-') + '/' + (limits.v ? limits.v : '-');

        console.log('Configured limits are: ' + limits.h + '/' + limits.v);
        Reveal.addEventListener('slidechanged', function(event) {

            // horizontal off limits
            if ((limits.h && event.indexh > limits.h - 1)) {

                console.log('Horizontal off limits: ' + limitsText);
                Reveal.slide(limits.h ? limits.h - 1 : event.indexh);

                //vertical off limits, tested only if horizontal limits exceeded
            } else if (event.indexh === limits.h - 1 && event.indexv > limits.v - 1) {

                console.log('vertical off limits: ' + limitsText);
                Reveal.slide(limits.h ? limits.h - 1 : event.indexh, limits.v ? limits.v - 1 : event.indexv);

            }

        });

    }


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