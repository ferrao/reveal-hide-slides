/* jshint -W117 */
(function() {
    'use strict';

    var config = Reveal.getConfig().limits;

    if (!config || !config.path) {
        return;
    }

    $.get(config.path, function(limits) {

        Reveal.addEventListener('slidechanged', function(event) {

            if ((limits.h && event.indexh > limits.h - 1) || (limits.v && event.indexv > limits.v - 1)) {

                console.log('You can not go further than ' + (limits.h ? limits.h : '-') + '/' + (limits.v ? limits.v : '-'));
                Reveal.slide(limits.h ? limits.h - 1 : event.indexh, limits.v ? limits.v - 1 : event.indexv);

            }

        });

    });

}());
