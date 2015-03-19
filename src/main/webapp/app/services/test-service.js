'use strict';

/* Services */

var mainServices = angular.module('mainServices');

mainServices.factory('Tests', ['$resource',
    function ($resource) {
        return $resource('/rest/tests/:testId', {testId: '@id'});
    }
]);
