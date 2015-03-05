'use strict';

var rekenenControllers = angular.module('rekenenControllers');

rekenenControllers.controller('OefeningenMenuCtrl', 
    ['$scope', '$location', '$routeParams', 'CategorieService', 'OefeningService', function ($scope, $location, $routeParams, CategorieService, OefeningService) {
            
       $scope.categorie = CategorieService.getCategorie($routeParams.categorie);
       $scope.items = OefeningService.getOefeningenVoorCategorie($routeParams.categorie);
       var selectedItem = $scope.items[0];
            
       $scope.itemSelected = function(item) {
           selectedItem = item;
       };
            
       $scope.select = function() {
           $location.path('/' + selectedItem.path).search(selectedItem.pathParams);
       };
       
       $scope.terugNaarCategorieMenu = function() {
           $location.search({});
           $location.path('/categorie').search('selected', $routeParams.categorie);
       };
       
    }]);

 rekenenControllers.controller('CategorieMenuCtrl', 
    ['$scope', '$location', '$routeParams', 'CategorieService', function ($scope, $location, $routeParams, CategorieService) {
            
       $scope.items = CategorieService.getCategorieen();
       $scope.selectedItemIndex = $routeParams.selected ? getIndexForCategorie($routeParams.selected) : 0;
       var geselecteerdeCategorie = $scope.items[$scope.selectedItemIndex];
               
       function getIndexForCategorie(categorie) {
           for(var i=0; i<$scope.items.length; i++) {
               if ($scope.items[i].id === categorie) {
                    return i;
               }
           }
           return null;
       }        
       
       $scope.itemSelected = function(item) {
           geselecteerdeCategorie = item;
       };
       
       $scope.openOefeningen = function() {
           $location.search({});
           $location.path('/oefeningen').search('categorie', geselecteerdeCategorie.id);
       };
       
    }]);
 