var through = require('through');

module.exports = function (file) {
    var buffer = "";

    return through(function(chunk) {
        buffer += chunk.toString();
    },
    function() {
        var compiled = "module.exports = '";

        compiled += buffer.replace(/\r?\n|\r/g, '\\\\n');
        compiled += "';";

        this.queue(compiled);
        this.queue(null);
    });
};