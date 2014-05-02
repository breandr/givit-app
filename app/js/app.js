'use strict';

// require('angular/angular');
// require('angular-route/angular-route');
// require('./controllers');
// require('./directives');
// require('./services');

angular.module('givitApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngStorage',
  'toggle-switch',
  'akoenig.deckgrid',
  'pasvaz.bindonce',
  'infinite-scroll',
  'angularMoment'
])
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/givit-list.html',
          controller: 'GivitListCtrl'
        })
        .when('/givit-list', {
          templateUrl: 'views/givit-list.html',
          controller: 'GivitListCtrl'
        })
        .when('/donate-item', {
          templateUrl: 'views/donate-item.html',
          controller: 'DonateItemCtrl'
        })
        .when('/user-details', {
          templateUrl: 'views/user-details.html',
          controller: 'UserDetailsCtrl'
        })
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(false);
    }
  ])
  .run(function ($rootScope) {
    FastClick.attach(document.body);

    document.addEventListener('backbutton', function (e) {
      var navDrawer = angular.element('.nav-drawer');

      if (navDrawer.hasClass('fadeInLeft')) {
        e.preventDefault();
        $rootScope.broadcast('navDrawer.hide');
      }else if(angular.element('body.modal-open').length > 0){
        angular.element('.modal.in').modal('hide');
      } else {
        navigator.app.backHistory();
      }
    }, false);
  });