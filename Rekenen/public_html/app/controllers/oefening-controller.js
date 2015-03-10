'use strict';

var OefeningCtrl = function($scope, $routeParams, ExerciseGenerator, $timeout, $modal, $location) {

        var oefeningId = $routeParams.oefeningId;
        var categorieId = $routeParams.categorie;
        
        this.init = function() {
            $scope.numberOfExercises = 10;
            $scope.successMessage = null;
            $scope.failMessage = null;
            $scope.score = 0;
            $scope.exercises = [];
            $scope.currentExerciseIndex = 0;
            $scope.currentExercise = null;

            new Konami(
                function() { 
                    $scope.score = $scope.numberOfExercises;
                    $scope.currentExerciseIndex = $scope.numberOfExercises - 1;
                    $scope.nextExercise();
                }
            );

            $scope.toggleShowSolution = function () {
                $scope.currentExercise.showSolution = true;
            };

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
                $scope.exercises = ExerciseGenerator.generateExercises($scope.numberOfExercises, $scope.exerciseOptions);
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
                            $location.path("/oefeningen").search({oefeningId: oefeningId, categorie: categorieId});
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
        };
       
    };