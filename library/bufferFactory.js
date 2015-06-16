'use strict';
var jshint = require('jshint').JSHINT;

function bufferFactory(file, options) {
    function onLintError(error) {
        var location = [error.line, error.character].join(':');
        options.errors.each(location, error.reason);
    }

    function setBuffer(buffer, encoding, next) {
        var source = buffer.toString('utf8');

        if ('production' == process.env.NODE_ENV) {
            options.lintrc.debug = false;
            options.lintrc.devel = false;
        }

        jshint(source, options.lintrc);

        if (jshint.errors.length) {
            options.errors.head(file);
            jshint.errors.forEach(onLintError);
            options.errors.tail();
            this.emit('error', {
                message: options.errors.message
            });
        }

        this.push(source);
        next();
    }

    return setBuffer;
}

module.exports = bufferFactory;
