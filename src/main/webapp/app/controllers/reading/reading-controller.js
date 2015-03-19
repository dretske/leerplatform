'use strict';

var readingControllers = angular.module('readingControllers');

readingControllers.controller('ReadingCtrl', 
    ['$scope', '$routeParams', 'ReadingTestService', '$timeout', '$modal', '$location',
    function ($scope, $routeParams, ReadingTestService, $timeout, $modal, $location) {
        
        $scope.exerciseOptions = {
        };
        
        var testCtrl = new TestCtrl($scope, $routeParams, ReadingTestService, $timeout, $modal, $location);
        testCtrl.init();

    }]);
