define(function (require) {
    var defineComponent = require('flight/lib/component');
    var withModel = require('ui/with_model');

    return defineComponent(withModel, searchBox);
    function searchBox() {
        this.defaultAttrs({
            searchBoxSelector: '.js-search-box'
        });
        this.defaultModel({
            searchText: ''
        });

        this.after('initialize', function () {
            this.bindViewModel(this.node);
            this.subscribeTo('searchText', this.handleChange);
        });

        this.handleChange = function (newValue) {
            this.trigger('uiSearchBoxChange', {
                value: (newValue || '').trim()
            });
        };

    }
});