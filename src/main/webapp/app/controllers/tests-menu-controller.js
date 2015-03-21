'use strict';

var mainControllers = angular.module('mainControllers');

mainControllers.controller('TestsMenuCtrl',
        ['$scope', '$location', '$routeParams', 'Categories', 'Tests', function ($scope, $location, $routeParams, Categories, Tests) {

                $scope.category = Categories.get({categoryId: $routeParams.category});
                $scope.items = Tests.query({categoryId: $routeParams.category}, onTestsLoaded);
                $scope.selectedItemIndex = $routeParams.testId ? getIndexForTest(parseInt($routeParams.testId)) : 0;
                var selectedItem = null;

                function onTestsLoaded() {
                    $scope.selectedItemIndex = $routeParams.testId ? getIndexForTest(parseInt($routeParams.testId)) : 0;
                    selectedItem = $scope.items[$scope.selectedItemIndex];
                }
                
                $scope.itemSelected = function (item) {
                    selectedItem = item;
                };

                $scope.select = function () {
                    $location.path('/' + selectedItem.path).search(selectedItem.pathParams);
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
