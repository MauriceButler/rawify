var through = require('through');

module.exports = function (file) {
    var parts = file.split('.'),
        lastPart = parts[parts.length - 1],
        ignoreExtentions = ['js','json'],
        buffer = "";

    if(parts.length === 1 || ~ignoreExtentions.indexOf(lastPart)){ // dodgey but meh.
       return through();
    }

    return through(function(chunk) {
        buffer += chunk.toString();
    },
    function() {
        var compiled = "module.exports = '";

        compiled += gelMinifier(buffer);
        compiled += "';";

        this.queue(compiled);
        this.queue(null);
    });
};