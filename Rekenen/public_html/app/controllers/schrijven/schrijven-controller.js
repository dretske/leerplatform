'use strict';

var schrijvenControllers = angular.module('schrijvenControllers');

schrijvenControllers.controller('SchrijvenCtrl', 
    ['$scope', '$routeParams', 'SchrijvenOefeningService', '$timeout', '$modal', '$location',
    function ($scope, $routeParams, SchrijvenOefeningService, $timeout, $modal, $location) {
        
        $scope.exerciseOptions = {
        };
        
        var oefeningCtrl = new OefeningCtrl($scope, $routeParams, SchrijvenOefeningService, $timeout, $modal, $location);
        oefeningCtrl.init();

    }]);
