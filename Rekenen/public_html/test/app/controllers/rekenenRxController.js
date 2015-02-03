'use strict';

var rekenenControllers = angular.module('rekenenControllers');

rekenenControllers.controller('RekenenCtrl', 
    ['$scope', 'ExerciseGenerator', '$timeout', '$modal', '$location', '$log',
    function ($scope, ExerciseGenerator, $timeout, $modal, $location, $log) {

        var min = 0;
        var max = 9;
        $scope.numberOfExercises = 10;
        $scope.successMessage = null;
        $scope.failMessage = null;
        $scope.score = 0;
        $scope.exercises = [];
        $scope.currentExerciseIndex = 0;
        $scope.currentExercise = null;
        $scope.testlist = ['één', 'twee', 'drie'];
        
        function valueOrDefault(value, defaultValue) {
            return typeof value === undefined ? defaultValue : value;
        }
        
        var easter_egg = new Konami(
            function() { 
                $scope.score = $scope.numberOfExercises;
                $scope.currentExerciseIndex = $scope.numberOfExercises - 1;
                $scope.nextExercise();
            }
        );
        
        $scope.nextExercise = function () {
            if ($scope.currentExerciseIndex < $scope.numberOfExercises-1) {
                $scope.currentExerciseIndex++;
                $scope.currentExercise = $scope.exercises[$scope.currentExerciseIndex];
            } else {
                openResultaatPopup();
            }
        };

        $scope.generateExercises = function () {
            $scope.score = 0;
            $scope.currentExerciseIndex = 0;
            $log.log("min: " + min + ", max: " + max);
            $scope.exercises = ExerciseGenerator.generateExercises($scope.numberOfExercises, min, max);
            $scope.currentExercise = $scope.exercises[$scope.currentExerciseIndex];
        };
        
        $scope.submitAnswer = function (data) {
            var solutionCorrect = $scope.currentExercise.enterAnswer(data);
            var timeToNextExercise;
            if (solutionCorrect) {
                $scope.successMessage = 'Proficiat!';
                $scope.failMessage = null;
                $scope.score++;
                timeToNextExercise = 1000;
            } else {
                $scope.successMessage = null;
                $scope.failMessage = 'Fout';
                timeToNextExercise = 4000;
            }
            $timeout($scope.nextExercise, timeToNextExercise);
            return solutionCorrect;
        };
        
        function openResultaatPopup() {
            var modalInstance = $modal.open({
                templateUrl: '../oefeningen/resultaatPopup.html',
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

rekenenControllers.controller('ResultaatCtrl', ['$scope', '$modalInstance', 'score', 'totaal', function ($scope, $modalInstance, score, totaal) {
    $scope.score = score; 
    $scope.totaal = totaal;
    
    $scope.toonSter1 = function() {
        return (score/totaal) >= 0.8;
    };
    $scope.toonSter2 = function() {
        return (score/totaal) >= 0.9;
    };
    $scope.toonSter3 = function() {
        return score === totaal;
    };
    
    $scope.terug = function() {
        $modalInstance.close('terug');
    };
    
    $scope.opnieuw = function() {
        $modalInstance.close('opnieuw');
    };
    
}]);
