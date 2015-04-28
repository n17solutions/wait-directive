'use strict';

var app = angular.module('n17-wait');
app.directive('n17-atomic-core', ['$scope', require('./atomic-core')]);