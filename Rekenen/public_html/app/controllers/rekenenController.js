'use strict';

var rekenenControllers = angular.module('rekenenControllers');

rekenenControllers.controller('RekenenCtrl', 
    ['$scope', '$routeParams', 'ExerciseGenerator', '$timeout', '$modal', '$location', '$log',
    function ($scope, $routeParams, ExerciseGenerator, $timeout, $modal, $location, $log) {

        var max = $routeParams.max;
        var subtraction = $routeParams.subtraction === undefined ? true : false;
        var graphical = $routeParams.graphical === undefined ? false : true;
        var withoutZero = graphical || ($routeParams.withoutZero === undefined ? false : true);
        
        $scope.numberOfExercises = 10;
        $scope.successMessage = null;
        $scope.failMessage = null;
        $scope.score = 0;
        $scope.exercises = [];
        $scope.currentExerciseIndex = 0;
        $scope.currentExercise = null;
        $scope.testlist = ['één', 'twee', 'drie'];
        $scope.graphicStyle = $routeParams.style === undefined ? 'apple' : $routeParams.style;
        
        var easter_egg = new Konami(
            function() { 
                $scope.score = $scope.numberOfExercises;
                $scope.currentExerciseIndex = $scope.numberOfExercises - 1;
                $scope.nextExercise();
            }
        );
        
        $scope.toggleShowSolution = function () {
            $scope.currentExercise.showSolution = true;
        }
        
        $scope.nextExercise = function () {
            if ($scope.currentExerciseIndex < $scope.numberOfExercises-1) {
                $scope.currentExerciseIndex++;
                $scope.currentExercise = $scope.exercises[$scope.currentExerciseIndex];
                $scope.currentExercise.showSolution = false;
            } else {
                openResultaatPopup();
            }
        };

        $scope.generateExercises = function () {
            $scope.score = 0;
            $scope.exercises = ExerciseGenerator.generateExercises($scope.numberOfExercises, withoutZero, max, subtraction);
            $scope.currentExerciseIndex = -1;
            $scope.nextExercise();
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
                timeToNextExercise = 6000;
                $timeout($scope.toggleShowSolution, 2000);
            }
            $timeout($scope.nextExercise, timeToNextExercise);
            return solutionCorrect;
        };
        
        $scope.footerClass = function() {
            if ($scope.currentExercise !== null) {
                return "rows-" + Math.ceil($scope.currentExercise.options.length / 6);
            }
            return "";
        }
        
        $scope.isNumeric = function(elem) {
            return typeof elem === "number";
        }
        
        $scope.vergelijkingElementTemplate = function() {
            if (graphical) {
                return "vergelijkingElement_images.html";
            }
            return "vergelijkingElement.html";
        }
        
        $scope.antwoordenTemplate = function() {
            if (graphical) {
                return "antwoorden_images.html";
            }
            return "antwoorden.html";
        }
        
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
