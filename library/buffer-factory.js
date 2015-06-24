'use strict';
var linter = require('eslint').linter;
var eslintrc = require('./configuration');

function bufferFactory(file, options) {
    function onLintError(error) {
        var location = [error.line, error.column].join(':');
        var url = 'http://eslint.org/docs/rules/'+ error.ruleId;
        options.errors.each(location, error.message, error.source, url);
    }

    function setBuffer(buffer, encoding, next) {
        var source = buffer.toString('utf8');
        var errors;

        //if ('production' == process.env.NODE_ENV) {
        //    options.lintrc.debug = false;
        //    options.lintrc.devel = false;
        //}

        errors = linter.verify(source, eslintrc);

        if (errors.length) {
            options.errors.head(file);
            errors.forEach(onLintError);
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
