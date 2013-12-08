'use strict';

var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return (/\.spec\.js$/.test(file));
});

requirejs.config({
  // Karma serves files from '/base'
  baseUrl: '/base',

  paths: {
    'flight': 'app/bower_components/flight',
    'ui': 'app/js/ui',
    'data': 'app/js/data',
    'page': 'app/js/page',
    'knockout-es5' : 'app/bower_components/knockout-es5-passy/dist/knockout-es5',
    'knockout' : 'app/bower_components/component-knockout-passy/knockout'
  },

  // ask Require.js to load these files (all our tests)
  deps: tests,

  // start test run, once Require.js is done
  callback: window.__karma__.start
});
