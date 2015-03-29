'use strict';

var mainControllers = angular.module('mainControllers');

mainControllers.controller('UsersCtrl',
        ['$scope', '$location', 'Users', 'AuthService', function ($scope, $location, Users, AuthService) {

                $scope.items = Users.query(onUsersLoaded);
                var selectedUser = null;

                function onUsersLoaded() {
                    $scope.selectedItemIndex = AuthService.currentUser() ? getIndexForUser(AuthService.currentUser().id) : 0;
                    selectedUser = $scope.items[$scope.selectedItemIndex];
                }

                function getIndexForUser(userId) {
                    for (var i = 0; i < $scope.items.length; i++) {
                        if ($scope.items[i].id === userId) {
                            return i;
                        }
                    }
                    return null;
                }

                $scope.itemSelected = function (item) {
                    selectedUser = item;
                };

                $scope.select = function () {
                    $location.search({});
                    AuthService.login(selectedUser);
                    $location.path('/categories');
                };

            }]);
 