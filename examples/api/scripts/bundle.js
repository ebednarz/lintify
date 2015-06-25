'use strict';
var browserify = require('browserify');
var fs = require('fs');
var mkdirp = require('mkdirp');

mkdirp('./target/');

browserify()
    .add('./source/beep.js')
    .transform('lintify', {
        errors: {
            head: function (file) {
                console.error('file:', file);
            },
            each: function (position, reason, source, url) {
                console.error(position, reason, source, url);
            },
            tail: function () {
                console.error('bundle: beep');
            },
            message: 'LINT ERROR'
        },
        lintrc: {
            globalstrict: true,
            devel: true
        }
    })
    .bundle()
    .on('error', function (error) {
        console.error(error.message);
    })
    .pipe(fs.createWriteStream('./target/beep.js', 'utf8'));
