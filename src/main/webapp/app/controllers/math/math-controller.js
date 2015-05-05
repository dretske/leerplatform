'use strict';

var mathControllers = angular.module('mathControllers');

mathControllers.controller('MathCtrl', 
    ['$scope', '$routeParams', 'EquationExerciseService', '$timeout', '$modal', '$location', 'AuthService', '$log',
    function ($scope, $routeParams, EquationExerciseService, $timeout, $modal, $location, AuthService, $log) {

        var max = $routeParams.max;
        var subtraction = $routeParams.subtraction === undefined ? true : $routeParams.subtraction === 'true';
        var graphical = $routeParams.graphical === undefined ? false : true;
        var withoutZero = graphical || ($routeParams.withoutZero === undefined ? false : true);
        
        $scope.exerciseOptions = {
            withoutZero: withoutZero,
            maxConstantsSize: max, 
            subtraction: subtraction
        };
        var exerciseCtrl = new ExerciseCtrl($scope, $routeParams, EquationExerciseService, $timeout, $modal, $location, AuthService);
        exerciseCtrl.init();

        $scope.graphicStyle = $routeParams.style === undefined ? 'apple' : $routeParams.style;
        
        $scope.isNumeric = function(elem) {
            return typeof elem === "number";
        };
        
        $scope.equationElementTemplate = function() {
            if (graphical) {
                return "equationElement_images.html";
            }
            return "equationElement.html";
        };
        
        $scope.answersTemplate = function() {
            if (graphical) {
                return "answers_images.html";
            }
            return "answers.html";
        };
               
    }]);
