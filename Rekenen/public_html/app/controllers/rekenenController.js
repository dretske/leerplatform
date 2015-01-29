'use strict';

/* Controllers */

var rekenenControllers = angular.module('rekenenControllers');

rekenenControllers.controller('RekenenCtrl', ['$scope', '$document', '$window', 'ExerciseGenerator',
    function ($scope, $document, $window, ExerciseGenerator) {

        $scope.successMessage = null;
        $scope.failMessage = null;
        $scope.score = 0;
        $scope.exercises = [];
        $scope.currentExerciseIndex = 0;
        $scope.currentExercise = null;
        $scope.allElements;
        
        angular.element($window).bind('resize', function () {
                clearCanvas();
            });

        function clearCanvas() {
            console.log('clearing canvas in controller');
            var canvas = $document[0].getElementById('canvas');
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

        $scope.nextExercise = function () {
            clearCanvas();
            $scope.currentExerciseIndex++;
            $scope.currentExercise = $scope.exercises[$scope.currentExerciseIndex];
            $scope.allElements = allElementsForExercise($scope.currentExercise.equation);
        };

        $scope.generateExercises = function () {
            $scope.exercises = ExerciseGenerator.generateExercises(10);
            $scope.currentExercise = $scope.exercises[$scope.currentExerciseIndex];
            $scope.allElements = allElementsForExercise($scope.currentExercise.equation);
        };
        
        $scope.submitAnswer = function (data) {
            if (data === $scope.currentExercise.solution) {
                $scope.successMessage = 'Proficiat!';
                $scope.failMessage = null;
                $scope.score++;
                $scope.currentExercise.score = 1;
            } else {
                $scope.successMessage = null;
                $scope.failMessage = 'Fout';
                $scope.currentExercise.score = 0;
            }
            $scope.nextExercise();
        };
              
        function allElementsForExercise(exercise) {
            var allElements = [];

            allElements.push(exercise.lhsConstants[0]);
            for (var i = 0; i< exercise.lhsOperators.length; i++) {
                allElements.push(exercise.lhsOperators[i]);
                allElements.push(exercise.lhsConstants[i+1]);
            }

            allElements.push('=');

            allElements.push(exercise.rhsConstants[0]);
            for (var i = 0; i< exercise.rhsOperators.length; i++) {
                allElements.push(exercise.rhsOperators[i]);
                allElements.push(exercise.rhsConstants[i+1]);
            }
            
            return allElements;
        };

    }]);

rekenenControllers.controller('StartSchermCtrl', ['$scope',
    function ($scope) {

    }]);
