define(function (require) {
    var fuzzy = require('fuzzy');

    return withSearchObject;
    function withSearchObject() {
        this.searchArray = function (arr, str) {
            var filtered = arr.filter(function (v) { return !!v.name; });
            var strArr = filtered.map(function (v) { return (v.data.name ? v.data.name + ' ' : '') + v.name + ' ';  });
            console.log('strArr', strArr);
            var matches = fuzzy.filter(str, strArr, {
                pre: '<strong>',
                post: '</strong>'
            });
            console.log('matches', matches);
            return matches.sort(function (a, b) {
                return b.score - a.score;
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
