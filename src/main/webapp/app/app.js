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
                templateUrl: 'exercises/math/math.html',
                controller: 'MathCtrl'
            })
            .when('/reading', {
                templateUrl: 'exercises/reading/reading.html',
                controller: 'ReadingCtrl'
            })
            .when('/writing', {
                templateUrl: 'exercises/writing/writing.html',
                controller: 'WritingCtrl'
            })
            .when('/counting', {
                templateUrl: 'exercises/math/counting.html',
                controller: 'CountingCtrl'
            })
            .when('/tests', {
                templateUrl: 'testsMenu.html',
                controller: 'TestsMenuCtrl'
            })
            .when('/category', {
                templateUrl: 'categoryMenu.html',
                controller: 'CategoryMenuCtrl'
            })
            .otherwise({
                redirectTo: '/category'
            });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(false);
});