'use strict';

var schrijvenControllers = angular.module('schrijvenControllers');

schrijvenControllers.controller('SchrijvenCtrl', 
    ['$scope', '$routeParams', 'SchrijvenOefeningService', '$timeout', '$modal', '$location',
    function ($scope, $routeParams, SchrijvenOefeningService, $timeout, $modal, $location) {
        
        $scope.exerciseOptions = {
        };
        
        $scope.lettersInAntwoord = [];
        $scope.draggableKeuzes = [];
        
        var nextExerciseCallback = function(exercise) {
            $scope.draggableKeuzes = [];
            $scope.lettersInAntwoord = [];
            for (var i=0; i < exercise.options.length; i++) {
                var option = exercise.options[i];
                $scope.draggableKeuzes.push({value: option, drag: true});
            }
            $scope.enableOkButton = true;
        };
        
        var showSolutionCallback = function() {
            console.log('');
            for (var i=0; i < $scope.currentExercise.solution.length; i++) {
                var letterInAntwoord = $scope.lettersInAntwoord[i];
                var letterInOplossing = $scope.currentExercise.solution.split('')[i];
                // Controleer of letter verkeerd is
                if (letterInAntwoord.value !== letterInOplossing) {
                    var gevonden = false;
                    // zoek waar de correcte letter staat en wissel om.
                    for (var j=0; j < $scope.draggableKeuzes.length; j++) {
                        var gevondenLetterInAntwoord = $scope.draggableKeuzes[j];
                        if (gevondenLetterInAntwoord && gevondenLetterInAntwoord.value === letterInOplossing) {
                            // Correcte letter gevonden. Wissel om.
                            $scope.lettersInAntwoord[i] = gevondenLetterInAntwoord;
                            $scope.lettersInAntwoord[i].correct = true;
                            $scope.draggableKeuzes[j] = letterInAntwoord;
                            gevonden = true;
                            break;
                        }
                    }
                    if (!gevonden) {
                        for (var j=0; j < $scope.lettersInAntwoord.length; j++) {
                            var gevondenLetterInAntwoord = $scope.lettersInAntwoord[j];
                            if (gevondenLetterInAntwoord.value === letterInOplossing) {
                                // Correcte letter gevonden. Wissel om.
                                $scope.lettersInAntwoord[i] = gevondenLetterInAntwoord;
                                $scope.lettersInAntwoord[i].correct = true;
                                $scope.lettersInAntwoord[j] = letterInAntwoord;
                                letterInAntwoord.correct = true;
                                gevonden = true;
                                break;
                            }
                        }
                    }
                }
            }
        };
        
        var oefeningCtrl = new OefeningCtrl($scope, $routeParams, 
            SchrijvenOefeningService, $timeout, $modal, $location,
            {
                nextExercise: nextExerciseCallback,
                showSolution: showSolutionCallback
            });
        oefeningCtrl.init();
        
        $scope.verzendAntwoord = function() {
            var letters = [];
            for (var i=0; i < $scope.lettersInAntwoord.length; i++) {
                letters.push($scope.lettersInAntwoord[i].value);
            }
            $scope.submitAnswer(letters.join(''));
            markeerCorrecteLetters();
            $scope.enableOkButton = false;
        };
        
        function markeerCorrecteLetters() {
            for (var i=0; i < $scope.lettersInAntwoord.length; i++) {
                var letterInAntwoord = $scope.lettersInAntwoord[i];
                var letterInOplossing = $scope.currentExercise.solution.split('')[i];
                letterInAntwoord.correct = letterInAntwoord.value === letterInOplossing;
            }
        }
        
        $scope.lettersInOplossing = function() {
            return $scope.currentExercise.solution.split('');
        };
        
        function allElementsDefined(array) {
            for (var i=0; i < array.length; i++) {
                if (typeof array[i] === 'undefined') {
                    return false;
                }
            }
            return true;
        }
        
        $scope.showOkButton = function() {
          return $scope.lettersInAntwoord.length === $scope.currentExercise.solution.length && allElementsDefined($scope.lettersInAntwoord);  
        };

    }]);
