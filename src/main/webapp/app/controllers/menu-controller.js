'use strict';

var mainControllers = angular.module('mainControllers');

mainControllers.controller('OefeningenMenuCtrl',
        ['$scope', '$location', '$routeParams', 'Categories', 'Exercises', function ($scope, $location, $routeParams, Categories, Exercises) {

                $scope.categorie = Categories.get({categorieId: $routeParams.categorie});
                $scope.items = Exercises.query({categoryId: $routeParams.categorie}, onExercisesLoaded);
                $scope.selectedItemIndex = $routeParams.oefeningId ? getIndexForOefening(parseInt($routeParams.oefeningId)) : 0;
                var selectedItem = null;

                function onExercisesLoaded() {
                    $scope.selectedItemIndex = $routeParams.oefeningId ? getIndexForOefening(parseInt($routeParams.oefeningId)) : 0;
                    selectedItem = $scope.items[$scope.selectedItemIndex];
                }
                
                $scope.itemSelected = function (item) {
                    selectedItem = item;
                };

                $scope.select = function () {
                    $location.path('/' + selectedItem.path).search(selectedItem.pathParams);
                    $location.search('oefeningId', selectedItem.id);
                    $location.search('categorie', $scope.categorie.id);
                };

                $scope.terugNaarCategorieMenu = function () {
                    $location.search({});
                    $location.path('/categorie').search('selected', $routeParams.categorie);
                };

                function getIndexForOefening(oefeningId) {
                    for (var i = 0; i < $scope.items.length; i++) {
                        if ($scope.items[i].id === oefeningId) {
                            return i;
                        }
                    }
                    return null;
                }

            }]);

mainControllers.controller('CategorieMenuCtrl',
        ['$scope', '$location', '$routeParams', 'Categories', function ($scope, $location, $routeParams, Categories) {

                $scope.items = Categories.query(onCategoriesLoaded);
                var selectedCategorie = null;

                function onCategoriesLoaded() {
                    $scope.selectedItemIndex = $routeParams.selected ? getIndexForCategory($routeParams.selected) : 0;
                    selectedCategorie = $scope.items[$scope.selectedItemIndex];
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
                    selectedCategorie = item;
                };

                $scope.openOefeningen = function () {
                    $location.search({});
                    $location.path('/oefeningen').search('categorie', selectedCategorie.id);
                };

            }]);
 