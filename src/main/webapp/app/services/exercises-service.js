'use strict';

var mainServices = angular.module('mainServices');

mainServices.factory('Exercises', ['$resource',
    function ($resource) {
        return $resource('/rest/exercises/:exerciseId', {exerciseId: '@id'});
    }
]);
