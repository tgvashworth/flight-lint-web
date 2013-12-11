define(function (require) {

    'use strict';

    /**
     * Module dependencies
     */

    var JSONSocketClient = require('data/json_socket_client');
    var FileLint = require('ui/file_lint');
    var SearchBox = require('ui/search_box');
    var SearchDropdown = require('ui/search_dropdown');
    var ChangeLog = require('ui/change_log');

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
        ChangeLog.attachTo('#changelog');
        JSONSocketClient.attachTo(document);
    }

});
