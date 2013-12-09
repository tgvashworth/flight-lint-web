define(function (require) {
    var fuzzy = require('fuzzy');

    return withSearchObject;
    function withSearchObject() {
        this.searchArray = function (arr, str) {
            var filtered = arr.filter(function (v) { return !!v.data.name; })
            var strArr = filtered.map(function (v) { return v.data.name + ' ';  });
            var matches = fuzzy.filter(str, strArr, {
                pre: '<strong>',
                post: '</strong>'
            });
            return matches.sort(function (a, b) {
                return a.score - b.score;
            }).reduce(function (memo, v) {
                memo.push({
                    match: v,
                    data: filtered[v.index]
                });
                return memo;
            }, []);
        };
    }
});
