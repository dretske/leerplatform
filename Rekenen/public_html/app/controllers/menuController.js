'use strict';

var rekenenControllers = angular.module('rekenenControllers');

rekenenControllers.controller('OefeningenMenuCtrl', 
    ['$scope', '$location', '$routeParams', 'CategorieService', 'OefeningService', function ($scope, $location, $routeParams, CategorieService, OefeningService) {
            
       $scope.categorie = CategorieService.getCategorie($routeParams.categorie);
       $scope.items = OefeningService.getOefeningenVoorCategorie($routeParams.categorie);

       $scope.itemSelected = function(item) {
           console.log('item selected = ' + item.id);
       };
            
       $scope.select = function(item) {
           $location.url('/' + item);
       };
    }]);

 rekenenControllers.controller('CategorieMenuCtrl', 
    ['$scope', '$location', 'CategorieService', function ($scope, $location, CategorieService) {
            
       $scope.items = CategorieService.getCategorieen();
       
       $scope.itemSelected = function(item) {
           console.log('item selected = ' + item.id);
       };
       
    }]);
 