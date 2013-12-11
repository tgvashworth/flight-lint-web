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
            this.bindViewModel(this.node);
            this.on(document, 'dataJSONSocketData', this.handleData);
        });

        this.handleData = function (event, data) {
            if (data.type === "marker") {
                return this.marker(data.value);
            }
            if (!Object.keys(data.data).length) return;
            var cachedFile = this.model.filesByName[data.name];
            var newFileObject = data;
            if (cachedFile) {
                var previousData = cachedFile.data;
                this.model.files.splice(cachedFile.index, 1, cachedFile.data = data);
                this.updatedFile(data.name, cachedFile.data, previousData);
            } else {
                var length = this.model.files.push(data);
                this.newFile(data.name, data);
                this.model.filesByName[data.name] = {
                    index: length - 1,
                    data: data
                };
            }
        };

        this.updatedFile = function (name, data, previousData) {};
        this.newFile = function (name, data, previousData) {};
        this.marker = function (value) {};
    }
});
