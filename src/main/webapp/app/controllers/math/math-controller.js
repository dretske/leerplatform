'use strict';

var mathControllers = angular.module('mathControllers');

mathControllers.controller('MathCtrl', 
    ['$scope', '$routeParams', 'EquationTestService', '$timeout', '$modal', '$location', 'AuthService', '$log',
    function ($scope, $routeParams, EquationTestService, $timeout, $modal, $location, AuthService, $log) {

        var max = $routeParams.max;
        var subtraction = $routeParams.subtraction === undefined ? true : $routeParams.subtraction;
        var graphical = $routeParams.graphical === undefined ? false : true;
        var withoutZero = graphical || ($routeParams.withoutZero === undefined ? false : true);
        
        $scope.exerciseOptions = {
            withoutZero: withoutZero,
            maxConstantsSize: max, 
            subtraction: subtraction
        };
        var testCtrl = new TestCtrl($scope, $routeParams, EquationTestService, $timeout, $modal, $location, AuthService);
        testCtrl.init();

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
