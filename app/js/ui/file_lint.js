define(function (require) {
    var defineComponent = require('flight/lib/component');
    var withModel = require('ui/with_model');
    var withFileData = require('ui/with_file_data');

    return defineComponent(withModel, fileLint, withFileData);
    function fileLint() {}
});