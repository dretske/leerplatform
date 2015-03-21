'use strict';

var mainControllers = angular.module('mainControllers');

mainControllers.controller('CategoriesMenuCtrl',
        ['$scope', '$location', '$routeParams', 'Categories', function ($scope, $location, $routeParams, Categories) {

                $scope.items = Categories.query(onCategoriesLoaded);
                var selectedCategory = null;

                function onCategoriesLoaded() {
                    $scope.selectedItemIndex = $routeParams.selected ? getIndexForCategory($routeParams.selected) : 0;
                    selectedCategory = $scope.items[$scope.selectedItemIndex];
                }

                function getIndexForCategory(category) {
                    for (var i = 0; i < $scope.items.length; i++) {
                        if ($scope.items[i].id === category) {
                            return i;
                        }
                    }
                    return null;
                }

                $scope.itemSelected = function (item) {
                    selectedCategory = item;
                };

                $scope.openTests = function () {
                    $location.search({});
                    $location.path('/tests').search('category', selectedCategory.id);
                };

            }]);
 