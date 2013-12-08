define(function (require) {
    var ko = require('knockout-es5');
    var utils = require('flight/lib/utils');

    return withModel;
    function withModel() {
        this.defaultModel = function (attrs) {
            if(!utils.push(this._modelDefaults, attrs, true)) {
                this._modelDefaults = attrs;
            }
        };

        /**
         * Bind a `model` to a specific DOM subtree (`node`). Setting the
         * `track` option to `false` *disables* automatic model tracking. The
         * default behavior is to watch the supplied `model` for changes via ES5
         * getters and setters.
         */
        this.bindViewModel = function (node, model, track) {
            if (node instanceof jQuery) {
                node = node[0];
            }
            model = model || this.model;

            if (track !== false) {
                ko.track(model);
            }
            ko.applyBindings(model, node);
        };

        /**
         * Unbinds all bindings from the given DOM `node`
         */
        this.unbindViewModel = function (node) {
            if (node instanceof jQuery) {
                node = node[0];
            }

            ko.cleanNode(node);
        };

        this.subscribeTo = function (property, callback) {
            ko.getObservable(this.model, property).subscribe(callback.bind(this));
        };

        this.after('initialize', function () {
            this.model = _.clone(this._modelDefaults || {});
        });
    }
});
