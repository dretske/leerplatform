'use strict';

var rekenenControllers = angular.module('rekenenControllers');

rekenenControllers.controller('RekenenCtrl', 
    ['$scope', '$routeParams', 'EquationExerciseGenerator', '$timeout', '$modal', '$location', '$log',
    function ($scope, $routeParams, EquationExerciseGenerator, $timeout, $modal, $location, $log) {

        var max = $routeParams.max;
        var subtraction = $routeParams.subtraction === undefined ? true : false;
        var graphical = $routeParams.graphical === undefined ? false : true;
        var withoutZero = graphical || ($routeParams.withoutZero === undefined ? false : true);
        
        $scope.exerciseOptions = {
            withoutZero: withoutZero,
            maxConstantsSize: max, 
            subtraction: subtraction
        };
        var oefeningCtrl = new OefeningCtrl($scope, $routeParams, EquationExerciseGenerator, $timeout, $modal, $location);
        oefeningCtrl.init();

        $scope.graphicStyle = $routeParams.style === undefined ? 'apple' : $routeParams.style;
        
        $scope.isNumeric = function(elem) {
            return typeof elem === "number";
        };
        
        $scope.vergelijkingElementTemplate = function() {
            if (graphical) {
                return "vergelijkingElement_images.html";
            }
            return "vergelijkingElement.html";
        };
        
        $scope.antwoordenTemplate = function() {
            if (graphical) {
                return "antwoorden_images.html";
            }
            return "antwoorden.html";
        };
               
    }]);
