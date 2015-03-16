'use strict';

var lezenControllers = angular.module('lezenControllers');

lezenControllers.controller('LezenCtrl', 
    ['$scope', '$routeParams', 'LezenOefeningService', '$timeout', '$modal', '$location',
    function ($scope, $routeParams, LezenOefeningService, $timeout, $modal, $location) {
        
        $scope.exerciseOptions = {
        };
        
        var oefeningCtrl = new OefeningCtrl($scope, $routeParams, LezenOefeningService, $timeout, $modal, $location);
        oefeningCtrl.init();

    }]);
