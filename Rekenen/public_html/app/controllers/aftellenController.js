'use strict';

/* Controllers */

var rekenenControllers = angular.module('rekenenControllers');

rekenenControllers.controller('AftellenCtrl', ['$scope', '$log', '$timeout', '$modal', function ($scope, $log, $timeout, $modal) {
        $scope.open = function (size) {
            var aftellenModalInstance = $modal.open({
                templateUrl: 'aftellenContent.html',
                controller: 'AftellenModalInstanceCtrl',
                size: size
            });
        };

    }]);

rekenenControllers.controller('AftellenModalInstanceCtrl', ['$scope', '$modalInstance', '$log', '$timeout', function ($scope, $modalInstance, $log, $timeout) {

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