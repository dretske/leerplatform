'use strict';

var writingControllers = angular.module('writingControllers');

writingControllers.controller('WritingCtrl', 
    ['$scope', '$routeParams', 'WritingExerciseService', 'CommonServices', '$timeout', '$modal', '$location', 'AuthService',
    function ($scope, $routeParams, WritingExerciseService, CommonServices, $timeout, $modal, $location, AuthService) {
        
        $scope.exerciseOptions = {
        };
        
        $scope.lettersInAnswer = [];
        $scope.draggableOptions = [];
        $scope.numberOfLettersKnown = $routeParams.numberOfLettersKnown ? $routeParams.numberOfLettersKnown === 'true' : false;
        
        var nextExerciseCallback = function(exercise) {
            $scope.draggableOptions = [];
            if ($scope.numberOfLettersKnown) {
                $scope.lettersInAnswer = CommonServices.createAndFillArray(exercise.solution.length, {});
            } else {
                $scope.lettersInAnswer = [{}];
            }
            for (var i=0; i < exercise.options.length; i++) {
                var option = exercise.options[i];
                $scope.draggableOptions.push({value: option, drag: true});
            }
            $scope.enableOkButton = true;
        };
        
        var showSolutionCallback = function() {
            for (var i=0; i < $scope.currentExercise.solution.length; i++) {
                var letterInAnswer = $scope.lettersInAnswer[i];
                var letterInSolution = $scope.currentExercise.solution.split('')[i];
                // Controleer of letter verkeerd is
                if (letterInAnswer.value !== letterInSolution) {
                    var found = false;
                    // zoek waar de correcte letter staat en wissel om.
                    for (var j=0; j < $scope.draggableOptions.length; j++) {
                        var foundLetterInAnswer = $scope.draggableOptions[j];
                        if (foundLetterInAnswer && foundLetterInAnswer.value === letterInSolution) {
                            // Correcte letter gevonden. Wissel om.
                            $scope.lettersInAnswer[i] = foundLetterInAnswer;
                            $scope.lettersInAnswer[i].correct = true;
                            $scope.draggableOptions[j] = letterInAnswer;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        for (var j=0; j < $scope.lettersInAnswer.length; j++) {
                            var foundLetterInAnswer = $scope.lettersInAnswer[j];
                            if (foundLetterInAnswer.value === letterInSolution) {
                                // Correcte letter gevonden. Wissel om.
                                $scope.lettersInAnswer[i] = foundLetterInAnswer;
                                $scope.lettersInAnswer[i].correct = true;
                                $scope.lettersInAnswer[j] = letterInAnswer;
                                letterInAnswer.correct = true;
                                found = true;
                                break;
                            }
                        }
                    }
                }
            }
        };
        
        var exerciseCtrl = new ExerciseCtrl($scope, $routeParams, 
            WritingExerciseService, $timeout, $modal, $location, AuthService,
            {
                nextExercise: nextExerciseCallback,
                showSolution: showSolutionCallback
            });
        exerciseCtrl.init();
        
        $scope.buildAndSubmitAnswer = function() {
            var letters = [];
            for (var i=0; i < $scope.lettersInAnswer.length; i++) {
                letters.push($scope.lettersInAnswer[i].value);
            }
            $scope.submitAnswer(letters.join(''));
            markCorrectLetters();
            $scope.enableOkButton = false;
        };
        
        function markCorrectLetters() {
            for (var i=0; i < $scope.lettersInAnswer.length; i++) {
                var letterInAnswer = $scope.lettersInAnswer[i];
                var letterInSolution = $scope.currentExercise.solution.split('')[i];
                if (letterInAnswer !== '') {
                    letterInAnswer.correct = letterInAnswer.value === letterInSolution;
                }
            }
        }
        
        function allElementsDefined(array) {
            for (var i=0; i < array.length; i++) {
                if (typeof array[i] === 'undefined') {
                    return false;
                }
            }
            return true;
        }
        
        function lastElementEmpty(array) {
            return array[array.length-1] === null || array[array.length-1] === '';
        }
        
        function adaptNumberOfLettersInAnswer() {
            while(lastElementEmpty($scope.lettersInAnswer)) {
                $scope.lettersInAnswer.pop();
            }
            $scope.lettersInAnswer.push('');
        }
        
        $scope.onToAnswerDrop = function () {
            if (!$scope.numberOfLettersKnown) {
                adaptNumberOfLettersInAnswer();
            }
        };
        
        $scope.showOkButton = function() {
          return !$scope.numberOfLettersKnown
                  || ($scope.lettersInAnswer.length === $scope.currentExercise.solution.length 
                    && allElementsDefined($scope.lettersInAnswer));  
        };

    }]);
