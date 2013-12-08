define(function (require) {
	var defineComponent = require('flight/lib/component');
	return defineComponent(JSONSocketClient);
	function JSONSocketClient() {
		this.defaultAttrs({
			failedToParseDataError: 'Failed to parse WebSocket data.',
			errorEvent: 'dataJSONSocketError',
			dataEvent: 'dataJSONSocketData'
		});

		this.after('initialize', function () {
			this.socket = new WebSocket('ws://localhost:9876');
			this.socket.addEventListener('message', this.handleMessage.bind(this));
			this.history = [];
		});

		this.handleMessage = function (event) {
			if (!event.data.length) return;
			var data;
			try {
				data = JSON.parse(event.data);
			} catch (e) {
				return this.trigger(this.attr.errorEvent, {
					error: this.attr.failedToParseDataError
				});
			}
			this.history.push({
				timestamp: Date.now(),
				data: data
			});
			this.trigger(this.attr.dataEvent, data);
		};

	}
});