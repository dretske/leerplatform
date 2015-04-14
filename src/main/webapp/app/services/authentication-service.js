'use strict';

/* Services */

var mainServices = angular.module('mainServices');

mainServices.factory('AuthService', ['Users', '$cookieStore', function (Users, $cookieStore) {
    var currentUser;
    
    initUserFromCookie();
    
    function initUserFromCookie() {
        var existing_cookie_user = $cookieStore.get('current.user');
        if (existing_cookie_user) {
            currentUser = existing_cookie_user;
        }
    }
    
    function login(user) {
        currentUser = user;
        $cookieStore.put('current.user', currentUser);
    }
    
    function getCurrentUser() {
        return currentUser;
    }
    
    function refreshCurrentUser(callback) {
        Users.get({userId: currentUser.id}, 
            saveUserInCookieAndCallCallback(callback));
    }
    
    function saveUserInCookieAndCallCallback(callback) {
        return function (value, headers) {
            currentUser = value;
            $cookieStore.put('current.user', value);
            callback(value, headers);
        };
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
