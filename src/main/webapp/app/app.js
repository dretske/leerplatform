var mainControllers = angular.module('mainControllers', []);
var mainServices = angular.module('mainServices', []);
var mainDirectives = angular.module('mainDirectives', []);
var lezenControllers = angular.module('lezenControllers', []);
var lezenServices = angular.module('lezenServices', []);
var schrijvenControllers = angular.module('schrijvenControllers', []);
var schrijvenServices = angular.module('schrijvenServices', []);
var rekenenControllers = angular.module('rekenenControllers', []);
var rekenenServices = angular.module('rekenenServices', []);

var leerPlatformApp = angular.module('leerPlatformApp', [
  'mainControllers',
  'mainDirectives',
  'mainServices',
  'lezenControllers',
  'lezenServices',
  'schrijvenControllers',
  'schrijvenServices',
  'rekenenControllers',
  'rekenenServices',
//  'ngDraggable',
  'ngDragDrop',
  'ngRoute',
  'ui.bootstrap'
//  ,
//  'ngMaterial'
]);

leerPlatformApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
            .when('/rekenen', {
                templateUrl: 'oefeningen/rekenen/rekenen.html',
                controller: 'RekenenCtrl'
            })
            .when('/lezen', {
                templateUrl: 'oefeningen/lezen/lezen.html',
                controller: 'LezenCtrl'
            })
            .when('/schrijven', {
                templateUrl: 'oefeningen/schrijven/schrijven.html',
                controller: 'SchrijvenCtrl'
            })
            .when('/tellen', {
                templateUrl: 'oefeningen/rekenen/tellen.html',
                controller: 'TellenCtrl'
            })
            .when('/oefeningen', {
                templateUrl: 'oefeningenMenu.html',
                controller: 'OefeningenMenuCtrl'
            })
            .when('/categorie', {
                templateUrl: 'categorieMenu.html',
                controller: 'CategorieMenuCtrl'
            })
            .otherwise({
                redirectTo: '/categorie'
            });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(false);
});