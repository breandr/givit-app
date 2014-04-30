'use strict';

angular.module('givitApp')
  .controller('NavDrawerCtrl', function ($scope, $rootScope, $location, User, App) {
    $scope.user = User.$storage.userDetails;

    // $scope.$on('givitListSearch.show', function hideNavBar() {
    //   $scope.hide();
    // });

    $scope.currentRouteIs = function (routes) {
      return App.currentRouteIs(routes);
    };
    
    $scope.show = function () {
      angular.element('.nav-drawer').collapse('show');
    };

    $scope.hide = function () {
      angular.element('.nav-drawer').collapse('hide');
    };

    $scope.redirectIfNoUserMinimalDetails = function ($event) {
      if (!User.hasMinimalDetails()) {
        $location.path('/user-details');
        $event.preventDefault();
      }
    };

    function onShow() {
      var toggleButton = angular.element('.navbar-header .navbar-toggle .fa-bars',
        angular.element(this)
        .parent()
        .parent());

      toggleButton.css('left', '-25px');
      angular.element('nav-drawer')
        .prepend($('<div class="nav-drawer-overlay" />'))
        .children('.nav-drawer-overlay')
        .on('click', function () {
          $(this).siblings('.nav-drawer').collapse('hide');
        })
        .css('height', window.screen.height)
        .fadeIn();
      $rootScope.$broadcast('navDrawer.show');
    }

    function onHide() {
      var toggleButton = angular.element('.navbar-header .navbar-toggle .fa-bars', angular.element(this).parent().parent());

      toggleButton.css('left', '-15px');
      angular.element('nav-drawer')
        .children('.nav-drawer-overlay')
        .fadeOut(function () {
          angular.element('.nav-drawer-overlay').remove();
        });
    }

    angular.element('nav-drawer')
      .on('show.bs.collapse', onShow)
      .on('hide.bs.collapse', onHide);
  });