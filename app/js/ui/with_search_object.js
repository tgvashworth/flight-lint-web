define(function (require) {
    var fuzzy = require('fuzzy');

    return withSearchObject;
    function withSearchObject() {
        this.searchArray = function (arr, str) {
            var strArr = arr.map(function (v) { return v.name + ' ' + (v.data.name || ''); });
            var matches = fuzzy.filter(str, strArr);
            return matches.sort(function (a, b) {
                return a.score - b.score;
            }).reduce(function (memo, v) {
                memo.push(arr[v.index]);
                return memo;
            }, []);
        };
    }
});
