'use strict';
var bufferFactory = require('./library/bufferFactory');
var isPackageFile = require('is-package-file');
var path = require('path');
var through2 = require('through2');

function lintify(modulePath, options) {
    var filePath = path.relative(process.cwd(), modulePath);
    var stream = isPackageFile(modulePath) ?
        through2() :
        through2(bufferFactory(filePath, options));
    return stream;
}

module.exports = lintify;
