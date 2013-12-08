define(function (require) {
    var ko = require('knockout-es5');
    var utils = require('flight/lib/utils');

    return withFileData;
    function withFileData() {
        this.defaultModel({
            files: [],
            filesByName: {}
        });

        this.after('initialize', function () {
            this.on(document, 'dataJSONSocketData', this.handleData);
            this.bindViewModel(this.node);
        });

        this.handleData = function (event, data) {
            var cachedFile = this.model.filesByName[data.name];
            var newFileObject = data;
            if (cachedFile) {
                this.model.files.splice(cachedFile.index, 1, cachedFile.data = data);
            } else {
                var length = this.model.files.push(data);
                this.model.filesByName[data.name] = {
                    index: length - 1,
                    data: data
                };
            }
        };
    }
});
