define(function (require) {

    'use strict';

    /**
     * Module dependencies
     */

    var JSONSocketClient = require('data/json_socket_client');
    var FileLint = require('ui/file_lint');
    var SearchBox = require('ui/search_box');
    var SearchDropdown = require('ui/search_dropdown');

    /**
     * Module exports
     */

    return initialize;

    /**
     * Module function
     */

    function initialize() {
        FileLint.attachTo('#file-lint');
        SearchBox.attachTo('#search');
        SearchDropdown.attachTo('#search-dropdown');
        JSONSocketClient.attachTo(document);
    }

});
