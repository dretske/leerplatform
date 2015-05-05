'use strict';

var mainServices = angular.module('mainServices');

mainServices.factory('Lessons', ['$resource',
    function ($resource) {
        return $resource('/rest/lessons/:lessonId', {lessonId: '@id'});
    }
]);
