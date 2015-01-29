var rekenenControllers = angular.module('rekenenControllers', []);

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
                templateUrl: 'oefeningen/rekenen.html',
                controller: 'RekenenCtrl'
            })
            .when('/menu', {
                templateUrl: 'menu.html',
                controller: 'MenuCtrl'
            })
            .otherwise({
                redirectTo: '/menu'
            });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(false);
});