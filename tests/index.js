var test = require('tape'),
    rawify = require('../index');

test('rawify Exists', function (t) {
    t.plan(2);
    t.ok(rawify, 'rawify Exists');
    t.equal(typeof rawify, 'function');
});