'use strict';

var mainControllers = angular.module('mainControllers');

mainControllers.controller('TestsMenuCtrl',
        ['$scope', '$location', '$routeParams', 'Categories', 'Tests', 'AuthService', 
            function ($scope, $location, $routeParams, Categories, Tests, AuthService) {

                $scope.category = Categories.get({categoryId: $routeParams.category});
                var selectedItem = null;
                
                function addUserScoreToTest(test) {
                    test.userScore = getMaxTestScoreForUser(test, AuthService.currentUser());
                    test.userStars = Math.max(0, test.userScore - 7);
                    return test;
                }
                
                function getMaxTestScoreForUser(test, user) {
                    if (user.testScores[test.id]) {
                        return user.testScores[test.id].maxScore;
                    } else {
                        return -1;
                    }
                }
                
                function onUserRefreshed() {
                    $scope.items.forEach(addUserScoreToTest);
                }

                function onTestsLoaded() {
                    $scope.selectedItemIndex = $routeParams.testId ? getIndexForTest($routeParams.testId) : 0;
                    AuthService.refreshCurrentUser(onUserRefreshed);
                    selectedItem = $scope.items[$scope.selectedItemIndex];
                }

                $scope.items = Tests.query({categoryId: $routeParams.category}, onTestsLoaded);
                
                $scope.itemSelected = function (item) {
                    selectedItem = item;
                };
                
                function addPathParamToLocation(pathParam) {
                    $location.search(pathParam.name, pathParam.value);
                }

                $scope.select = function () {
                    $location.path('/' + selectedItem.path);
                    selectedItem.pathParams.forEach(addPathParamToLocation);
                    $location.search('testId', selectedItem.id);
                    $location.search('category', $scope.category.id);
                };

                $scope.backToCategoriesMenu = function () {
                    $location.search({});
                    $location.path('/categories').search('selected', $routeParams.category);
                };

                function getIndexForTest(testId) {
                    for (var i = 0; i < $scope.items.length; i++) {
                        if ($scope.items[i].id === testId) {
                            return i;
                        }
                    }
                    return null;
                }

            }]);
