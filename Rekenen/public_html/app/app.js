var rekenenControllers = angular.module('rekenenControllers', []);
var rekenenServices = angular.module('rekenenServices', []);
var rekenenDirectives = angular.module('rekenenDirectives', []);

var rekenenApp = angular.module('rekenenApp', [
  'rekenenControllers',
  'rekenenServices',
  'rekenenDirectives',
  'ngDraggable',
  'ngRoute',
  'ui.bootstrap'
//  ,
//  'ngMaterial'
]);

rekenenApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
            .when('/rekenen', {
                templateUrl: 'oefeningen/rekenen/rekenen.html',
                controller: 'RekenenCtrl'
            })
            .when('/tellen', {
                templateUrl: 'oefeningen/rekenen/tellen.html',
                controller: 'TellenCtrl'
            })
            .when('/menu', {
                templateUrl: 'menu.html',
                controller: 'MenuCtrl'
            })
            .when('/menu2', {
                templateUrl: 'menu2.html',
                controller: 'Menu2Ctrl'
            })
            .otherwise({
                redirectTo: '/menu2'
            });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(false);
});