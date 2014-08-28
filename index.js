var through = require('through');

module.exports = function (file) {
    var buffer = "";

    if (!/\..*$/i.test(fileName)) {
        return through();
    }

    return through(function(chunk) {
        buffer += chunk.toString();
    },
    function() {
        var compiled = "module.exports = '";
        compiled += JSON.stringify(buffer);
        compiled += "';";

        this.queue(compiled);
        this.queue(null);
    });
};