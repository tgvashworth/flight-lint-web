define(function (require) {
    return withClickTrap;
    function withClickTrap() {
        this.after('initialize', function () {
            this.on(document, 'click', this.handleClick);
            this.on('click', this.handleInternalClick);
        });

        this.handleClick = function (event, data) {
            this.trigger(this.internalClick ? 'uiInternalClick' : 'uiExternalClick');
            this.internalClick = false;
        };

        this.handleInternalClick = function (event) {
            this.internalClick = true;
        };
    }
});
