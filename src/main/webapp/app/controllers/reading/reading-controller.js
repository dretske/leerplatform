'use strict';

var readingControllers = angular.module('readingControllers');

readingControllers.controller('ReadingCtrl', 
    ['$scope', '$routeParams', 'ReadingExerciseService', '$timeout', '$modal', '$location', 'AuthService',
    function ($scope, $routeParams, ReadingExerciseService, $timeout, $modal, $location, AuthService) {
        
        $scope.exerciseOptions = {
        };
        
        var exerciseCtrl = new ExerciseCtrl($scope, $routeParams, ReadingExerciseService, $timeout, $modal, $location, AuthService);
        exerciseCtrl.init();

    }]);
