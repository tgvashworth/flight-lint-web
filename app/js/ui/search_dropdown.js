define(function (require) {
    var defineComponent = require('flight/lib/component');
    var withModel = require('ui/with_model');
    var withSearchObject = require('ui/with_search_object');
    var withFileData = require('ui/with_file_data');
    var withClickTrap = require('ui/with_click_trap');

    return defineComponent(withModel, searchDropdown, withFileData, withSearchObject, withClickTrap);
    function searchDropdown() {
        this.defaultAttrs({});
        this.defaultModel({
            filteredFiles: []
        });

        this.after('initialize', function () {
            this.on(document, 'uiSearchBoxChange', this.filterFiles);
            this.on('uiExternalClick', this.handleExternalClick);
        });

        this.filterFiles = function (event, data) {
            if (!data.value.length) {
                return this.model.filteredFiles = [];
            }
            this.model.filteredFiles = this.searchArray(this.model.files, data.value).slice(0, 3);
        };

        this.handleExternalClick = function () {
            this.model.filteredFiles = [];
        };
    }
});