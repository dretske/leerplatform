'use strict';

/* Services */

var mainServices = angular.module('mainServices');

mainServices.factory('Users', ['$resource',
    function ($resource) {
        return $resource('/rest/users/:userId', {userId: '@id'}, {
            addTestScore: {method: 'POST', url: '/rest/users/:userId/addtestscore'}
        });
    }
]);
