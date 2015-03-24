'use strict';

/* Services */

var mainServices = angular.module('mainServices');

mainServices.factory('AuthService', ['Users', function (Users) {
    var currentUser;
    
    function login(user) {
        currentUser = user;
    }
    
    function getCurrentUser() {
        return currentUser;
    }
    
    function refreshCurrentUser(callback) {
        currentUser = Users.get({userId: currentUser.id}, callback);
    }
    
    return {
        login: login,
        logout: function() { this.currentUser = null; },
        isLoggedIn: function(user) { this.currentUser.id === user.id; },
        currentUser: getCurrentUser,
        refreshCurrentUser: refreshCurrentUser
      };
  }
]);
