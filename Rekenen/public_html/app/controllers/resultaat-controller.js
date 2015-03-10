'use strict';

var mainControllers = angular.module('mainControllers');

mainControllers.controller('ResultaatCtrl', ['$scope', '$modalInstance', 'score', 'totaal', function ($scope, $modalInstance, score, totaal) {
    $scope.score = score; 
    $scope.totaal = totaal;
    
    $scope.toonSter1 = function() {
        return (score/totaal) >= 0.8;
    };
    $scope.toonSter2 = function() {
        return (score/totaal) >= 0.9;
    };
    $scope.toonSter3 = function() {
        return score === totaal;
    };
    
    $scope.terug = function() {
        $modalInstance.close('terug');
    };
    
    $scope.opnieuw = function() {
        $modalInstance.close('opnieuw');
    };
    
}]);
