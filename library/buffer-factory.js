'use strict';
var linter = require('eslint').linter;
var configuration = require('./configuration');

var ESLINT_RULES_URL = 'http://eslint.org/docs/rules/';

function bufferFactory(file, options) {
    function onLintError(error) {
        var location = [error.line, error.column].join(':');
        var url = ESLINT_RULES_URL + error.ruleId;
        options.errors.each(location, error.message, error.source, url);
    }

    function setBuffer(buffer, encoding, next) {
        var source = buffer.toString('utf8');
        var errors = linter.verify(source, configuration);

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
