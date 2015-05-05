'use strict';

/* Services */

var mainServices = angular.module('mainServices');

mainServices.factory('Categories', ['$resource',
    function ($resource) {
        return $resource('/rest/categories/:categoryId', {categoryId: '@id'}, {
            getLearningActivities: {method: 'GET', url: '/rest/categories/:categoryId/learningactivities', isArray: true}
        });
    }
]);
