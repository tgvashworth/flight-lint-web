'use strict';

requirejs.config({
    baseUrl: '',
    paths: {
        'flight': 'bower_components/flight',
        'ui': 'js/ui',
        'data': 'js/data',
        'page': 'js/page',
        'knockout-es5' : 'bower_components/knockout-es5-passy/dist/knockout-es5',
        'knockout' : 'bower_components/component-knockout-passy/knockout',
        'fuzzy' : 'bower_components/fuzzy-search/fuzzy-min',
        'deep-diff' : 'bower_components/deep-diff/releases/deep-diff-0.1.4.min',
    },
    shim: {
        'fuzzy': {
            exports: 'fuzzy'
        },
        'deep-diff': {
            exports: 'DeepDiff'
        }
    }
});

require(
    [
        'flight/lib/compose',
        'flight/lib/registry',
        'flight/lib/advice',
        'flight/lib/logger',
        'flight/lib/debug'
    ],

    function(compose, registry, advice, withLogging, debug) {
        debug.enable(true);
        compose.mixin(registry, [advice.withAdvice, withLogging]);

        require(['page/default'], function(initializeDefault) {
            initializeDefault();
        });
    }
);
