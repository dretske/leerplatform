'use strict';

var readingControllers = angular.module('readingControllers');

readingControllers.controller('ReadingCtrl', 
    ['$scope', '$routeParams', 'ReadingTestService', '$timeout', '$modal', '$location', 'AuthService',
    function ($scope, $routeParams, ReadingTestService, $timeout, $modal, $location, AuthService) {
        
        $scope.exerciseOptions = {
        };
        
        var testCtrl = new TestCtrl($scope, $routeParams, ReadingTestService, $timeout, $modal, $location, AuthService);
        testCtrl.init();

    }]);
