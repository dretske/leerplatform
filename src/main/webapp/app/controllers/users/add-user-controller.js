'use strict';

var mainControllers = angular.module('mainControllers');

mainControllers.controller('AddUserCtrl', ['$scope', '$location', '$routeParams', 'Users', 
    function ($scope, $location, $routeParams, Users) {
        
        $scope.addUser = function() {
            console.log('Adding user ' + $scope.username);
            var newUser = new Users({name: $scope.username});
            newUser.$save(function(user) {
                console.log('User added with id ' + user.id);
            });
        };

    }]);
 