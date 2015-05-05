'use strict';

/* Services */

var mainServices = angular.module('mainServices');

mainServices.factory('Users', ['$resource',
    function ($resource) {
        return $resource('/rest/users/:userId', {userId: '@id'}, {
            addExerciseScore: {method: 'POST', url: '/rest/users/:userId/addexercisescore'}
        });
    }
]);
