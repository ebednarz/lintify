'use strict';
var defaultConfiguration = require('../data/eslintrc');
var packageName = require('../package').name;
var merge = require('lodash.merge');
var packageConfiguration = require('reverse-config')[packageName];
var config = merge({}, defaultConfiguration, packageConfiguration);

module.exports = config;
