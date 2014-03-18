'use strict';

angular.module('givitApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngStorage',
  'toggle-switch',
  'akoenig.deckgrid',
  'pasvaz.bindonce'
])
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          // templateUrl: 'views/main.html',
          // controller: 'MainCtrl'
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
        .when('/terms-of-participation', {
          templateUrl: 'views/terms-of-participation.html',
          controller: 'TermsOfParticipationCtrl'
        })
        .when('/give-item/:itemGuid', {
          templateUrl: 'views/give-item.html',
          controller: 'GiveItemCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(false);
    }
  ])
  .run(function () {
    $(document).on('show.bs.collapse', '.nav-drawer', function () {
      var toggleButton = $('.navbar-header .navbar-toggle .btn', $(this).parent().parent());

      toggleButton.css('left', '-25px');
    }).on('hide.bs.collapse', '.nav-drawer', function () {
      var toggleButton = $('.navbar-header .navbar-toggle .btn', $(this).parent().parent());

      toggleButton.css('left', '-15px');
    });

    document.addEventListener('backbutton', function (e) {
      var navDrawer = $('.nav-drawer');

      if (navDrawer.hasClass('in')) {
        e.preventDefault();
        navDrawer.collapse('hide');
      }
    }, false);
  });