'use strict';

var mainControllers = angular.module('mainControllers');

mainControllers.controller('ExercisesMenuCtrl',
        ['$scope', '$location', '$routeParams', 'Categories', 'AuthService', 'CommonServices', 
            function ($scope, $location, $routeParams, Categories, AuthService, CommonServices) {

                function onExercisesLoaded() {
                    $scope.selectedItemIndex = $routeParams.exerciseId ? getIndexForExercise($routeParams.exerciseId) : 0;
                    AuthService.refreshCurrentUser(onUserRefreshed);
                    selectedItem = $scope.items[$scope.selectedItemIndex];
                    
                    $scope.itemRows = CommonServices.splitIntoSmallerArrays($scope.items, 2, 3);
                }
                
                $scope.category = Categories.get({categoryId: $routeParams.category});
                $scope.items = Categories.getLearningActivities({categoryId: $routeParams.category}, onExercisesLoaded);

                var selectedItem = null;
                
                function addUserScoreToExercise(exercise) {
                    exercise.userScore = getMaxExerciseScoreForUser(exercise, AuthService.currentUser());
                    exercise.userStars = Math.max(0, exercise.userScore - 7);
                    return exercise;
                }
                
                function getMaxExerciseScoreForUser(exercise, user) {
                    for (var i = 0; i < user.maxScores.length; i++) {
                        if (user.maxScores[i].exerciseId === exercise.id) {
                            return user.maxScores[i].score;
                        }
                    }
                    
                    return -1;
                }
                
                function onUserRefreshed() {
                    $scope.items.forEach(addUserScoreToExercise);
                }
                
                $scope.itemSelected = function (item) {
                    selectedItem = item;
                };
                
                $scope.select = function () {
                    $location.path('/' + selectedItem.path);
                    
                    for (var param in selectedItem.pathParams) {
                        if( selectedItem.pathParams.hasOwnProperty(param) ) {
                            $location.search(param, selectedItem.pathParams[param]);
                        } 
                    } 
                    $location.search('exerciseId', selectedItem.id);
                    $location.search('category', $scope.category.id);
                };

                $scope.backToCategoriesMenu = function () {
                    $location.search({});
                    $location.path('/categories').search('selected', $routeParams.category);
                };

                function getIndexForExercise(exerciseId) {
                    for (var i = 0; i < $scope.items.length; i++) {
                        if ($scope.items[i].id === exerciseId) {
                            return i;
                        }
                    }
                    return null;
                }

            }]);
