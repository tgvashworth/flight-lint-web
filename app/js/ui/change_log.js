define(function (require) {
    var defineComponent = require('flight/lib/component');
    var withModel = require('ui/with_model');
    var withFileData = require('ui/with_file_data');
    var deepDiff = require('deep-diff');

    return defineComponent(withModel, withFileData, changeLog);
    function changeLog() {
        this.defaultAttrs({
            timeout: 10 * 1000
        });
        this.defaultModel({
            changes: []
        });

        this.after('initialize', function () {
            this.model.removeChange = function (index) {
                this.model.changes.splice(index, 1);
                return true;
            }.bind(this);

            setInterval(function () {
                var out = 0;
                while (this.model.changes[out] && (this.model.changes[out].timestamp + this.attr.timeout) < Date.now()) {
                    out++;
                }
                this.model.changes.splice(0, out);
            }.bind(this), 1000);

            // Wait for the live marker to show updates
            this.after('marker', function (value) {
                if (value === "live") {
                    this.after('newFile', function () {});

                    this.after('updatedFile', function (name, data, previousData) {
                        this.model.changes.push({
                            type: 'Updated file',
                            title: (data.data.name || data.name),
                            subtitle: (data.data.name ? data.name : undefined),
                            href: data.name,
                            timestamp: Date.now()
                        });
                    });
                }
            });

        });
    }
});