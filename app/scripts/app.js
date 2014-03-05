'use strict';

angular.module('givitApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/givitList', {
        templateUrl: 'views/givitlist.html',
        controller: 'GivitlistCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
