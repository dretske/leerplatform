'use strict';

var rekenenControllers = angular.module('rekenenControllers');

rekenenControllers.controller('MenuCtrl', 
    ['$scope', '$location', function ($scope, $location) {
            
       $scope.items = [
           {titel: 'Niveau 1: 1 tot 3', path: 'rekenen?max=3&graphical=true&style=apple&subtraction=false'}, 
           {titel: 'Niveau 2: 1 tot 3', path: 'rekenen?max=3&graphical=true&style=ijsjes'}, 
           {titel: 'Niveau 3: 1 tot 3', path: 'rekenen?withoutZero=true&max=3'}, 
           {titel: 'Niveau 4: 0 tot 5', path: 'rekenen?max=5'}, 
           {titel: 'Niveau 5: 0 tot 8', path: 'rekenen?max=8'}
       ];
            
       $scope.select = function(item) {
           $location.url('/' + item);
       };
    }]);

 rekenenControllers.controller('Menu2Ctrl', 
    ['$scope', '$location', function ($scope, $location) {
            
       $scope.items = [
           {id: 0, titel: 'Rekenen', path: 'images/rekenenMenuItem.png'}, 
           {id: 1, titel: 'Lezen', path: 'images/lezenMenuItem.png'}, 
           {id: 2, titel: 'Schrijven', path: 'images/schrijvenMenuItem.png'}
       ];
       
       $scope.itemSelected = function(item) {
           console.log('item selected = ' + item.id);
       };
       
    }]);
 