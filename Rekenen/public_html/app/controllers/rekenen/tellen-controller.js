'use strict';

var rekenenControllers = angular.module('rekenenControllers');

rekenenControllers.controller('TellenCtrl', 
    ['$scope', '$routeParams', 'CountingExerciseGenerator', '$timeout', '$modal', '$location',
    function ($scope, $routeParams, CountingExerciseGenerator, $timeout, $modal, $location) {

        var max = $routeParams.max;
        
        $scope.numberOfExercises = 10;
        $scope.successMessage = null;
        $scope.failMessage = null;
        $scope.score = 0;
        $scope.exercises = [];
        $scope.currentExerciseIndex = 0;
        $scope.currentExercise = null;
        $scope.showSolution = false;
        $scope.options = false;
        
        var easter_egg = new Konami(
            function() { 
                $scope.score = $scope.numberOfExercises;
                $scope.currentExerciseIndex = $scope.numberOfExercises - 1;
                $scope.nextExercise();
            }
        );
        
        $scope.toggleShowSolution = function () {
            $scope.showSolution = true;
        };
        
        $scope.nextExercise = function () {
            if ($scope.currentExerciseIndex < $scope.numberOfExercises-1) {
                $scope.currentExerciseIndex++;
                $scope.currentExercise = $scope.exercises[$scope.currentExerciseIndex];
                $scope.showSolution = false;
            } else {
                openResultaatPopup();
            }
        };

        $scope.generateExercises = function () {
            $scope.score = 0;
            $scope.exercises = CountingExerciseGenerator.generateExercises($scope.numberOfExercises, max, 5);
            $scope.currentExerciseIndex = -1;
            $scope.nextExercise();
        };
        
        $scope.submitAnswer = function (data) {
            var solutionCorrect = data === $scope.currentExercise.solution;
            var timeToNextExercise;
            if (solutionCorrect) {
                $scope.successMessage = 'Proficiat!';
                $scope.failMessage = null;
                $scope.score++;
                timeToNextExercise = 1000;
            } else {
                $scope.successMessage = null;
                $scope.failMessage = 'Fout';
                timeToNextExercise = 6000;
                $timeout($scope.toggleShowSolution, 2000);
            }
            $timeout($scope.nextExercise, timeToNextExercise);
            return solutionCorrect;
        };
        
        $scope.footerClass = function() {
            if ($scope.currentExercise !== null) {
                return "rows-" + Math.ceil($scope.options.length / 6);
            }
            return "";
        };
        
        $scope.isNumeric = function(elem) {
            return typeof elem === "number";
        };

        function openResultaatPopup() {
            var modalInstance = $modal.open({
                templateUrl: 'oefeningen/resultaatPopup.html',
                controller: 'ResultaatCtrl',
                size: 'lg',
                resolve: {
                    score: function () {
                        return $scope.score;
                    },
                    totaal: function () {
                        return $scope.numberOfExercises;
                    }
                }
            });
            
            modalInstance.result.then(function (result) {
                switch (result) {
                    case 'terug':
                        $location.url("/menu");
                        break;
                    case 'opnieuw':
                        $scope.generateExercises();
                        break;
                }
                $scope.generateExercises();
            }, function () {
                $location.url("/menu");
            });
        };
       
    }]);
