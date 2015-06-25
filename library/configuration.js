'use strict';
var merge = require('lodash.merge');
var path = require('path');
var processPackage = require(path.join(process.cwd(), 'package'));

var packageConfiguration = processPackage.eslintConfig || {};
var sharedConfiguration = {};
var configuration;

if (packageConfiguration.extends) {
    sharedConfiguration = require(packageConfiguration.extends);
    delete packageConfiguration.extends;
}

configuration = merge(sharedConfiguration, packageConfiguration);

module.exports = configuration;
