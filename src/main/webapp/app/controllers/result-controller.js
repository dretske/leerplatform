'use strict';

var mainControllers = angular.module('mainControllers');

mainControllers.controller('ResultCtrl', ['$scope', '$modalInstance', 'score', 'total', function ($scope, $modalInstance, score, total) {
    $scope.score = score; 
    $scope.total = total;
    
    $scope.showStar1 = function() {
        return (score/total) >= 0.8;
    };
    $scope.showStar2 = function() {
        return (score/total) >= 0.9;
    };
    $scope.showStar3 = function() {
        return score === total;
    };
    
    $scope.back = function() {
        $modalInstance.close('back');
    };
    
    $scope.retry = function() {
        $modalInstance.close('retry');
    };
    
}]);
