var through = require('through');

module.exports = function(fileName) {
    var buffer = "";

    if (!/\.(?=.*)(?!(?:js$)|(?:json$)|(?:node$)).*$/i.test(fileName)) {
        return through();
    }

    return through(function(chunk) {
        buffer += chunk.toString();
    },
    function() {

        // If the buffer already has an exports,
        // it's probably already been transformed by something else.
        if(buffer.match(/module\.exports/)){
            this.queue(buffer);
            this.queue(null);
            return;
        }

        var compiled = "module.exports = ";
        compiled += JSON.stringify(buffer);
        compiled += ";";

        this.queue(compiled);
        this.queue(null);
    });
};