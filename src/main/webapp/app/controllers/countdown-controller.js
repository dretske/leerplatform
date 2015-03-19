'use strict';

/* Controllers */

var mathControllers = angular.module('mathControllers');

mathControllers.controller('CountDownCtrl', ['$scope', '$log', '$timeout', '$modal', function ($scope, $log, $timeout, $modal) {
        $scope.open = function (size) {
            var countDownModalInstance = $modal.open({
                templateUrl: 'countDownContent.html',
                controller: 'CountDownModalInstanceCtrl',
                size: size
            });
        };

    }]);

mathControllers.controller('CountDownModalInstanceCtrl', ['$scope', '$modalInstance', '$log', '$timeout', function ($scope, $modalInstance, $log, $timeout) {

        $scope.teller = 5;
        startCountdown(5);
        
        function startCountdown(seconds) {
            $scope.teller = seconds;
            registerCountDown();
        }
        
        function registerCountDown() {
            $timeout(countDown, 1000);
        }
        
        function countDown() {
            if ($scope.teller > 1) {
                $scope.teller--;
                registerCountDown();
            } else {
                $modalInstance.close();
            }
        }

    }]);