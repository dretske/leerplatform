var mainControllers = angular.module('mainControllers', []);
var mainServices = angular.module('mainServices', []);
var mainDirectives = angular.module('mainDirectives', []);
var readingControllers = angular.module('readingControllers', []);
var readingServices = angular.module('readingServices', []);
var writingControllers = angular.module('writingControllers', []);
var writingServices = angular.module('writingServices', []);
var mathControllers = angular.module('mathControllers', []);
var mathServices = angular.module('mathServices', []);

var leerPlatformApp = angular.module('leerPlatformApp', [
  'mainControllers',
  'mainDirectives',
  'mainServices',
  'readingControllers',
  'readingServices',
  'writingControllers',
  'writingServices',
  'mathControllers',
  'mathServices',
  'ngResource',
  'ngDragDrop',
  'ngRoute',
  'ui.bootstrap'
//  ,
//  'ngMaterial'
]);

leerPlatformApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
            .when('/math', {
                templateUrl: 'app/controllers/math/math.html',
                controller: 'MathCtrl'
            })
            .when('/reading', {
                templateUrl: 'app/controllers/reading/reading.html',
                controller: 'ReadingCtrl'
            })
            .when('/writing', {
                templateUrl: 'app/controllers/writing/writing.html',
                controller: 'WritingCtrl'
            })
            .when('/counting', {
                templateUrl: 'app/controllers/math/counting.html',
                controller: 'CountingCtrl'
            })
            .when('/tests', {
                templateUrl: 'app/controllers/tests-menu.html',
                controller: 'TestsMenuCtrl'
            })
            .when('/categories', {
                templateUrl: 'app/controllers/categories-menu.html',
                controller: 'CategoriesMenuCtrl'
            })
            .when('/users', {
                templateUrl: 'app/controllers/users/users.html',
                controller: 'UsersCtrl'
            })
            .when('/users/new', {
                templateUrl: 'app/controllers/users/add-user.html',
                controller: 'AddUserCtrl'
            })
            .otherwise({
                redirectTo: '/categories'
            });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(false);
});