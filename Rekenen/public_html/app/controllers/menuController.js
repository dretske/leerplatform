'use strict';

var rekenenControllers = angular.module('rekenenControllers');

rekenenControllers.controller('MenuCtrl', 
    ['$scope', '$location', function ($scope, $location) {
            
       $scope.items = [
           {titel: 'Niveau 1: 1 tot 3', path: 'rekenen?min=1&max=3'}, 
           {titel: 'Niveau 2: 0 tot 5', path: 'rekenen?min=0&max=5'}, 
           {titel: 'Niveau 3: 0 tot 8', path: 'rekenen?min=0&max=8'}
       ];
            
       $scope.select = function(item) {
           $location.url('/' + item);
       };
    }]);
 