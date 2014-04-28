'use strict';

angular.module('givitApp')
  .controller('NavDrawerCtrl', function ($scope, $location, User) {
    $scope.user = User.$storage.userDetails;

    $scope.show = function () {
      $('.nav-drawer').collapse('show');
    };

    $scope.hide = function () {
      $('.nav-drawer').collapse('hide');
    };

    $scope.onShow = function () {
      angular.element('nav-drawer')
        .prepend($('<div class="nav-drawer-overlay" />'))
        .children('.nav-drawer-overlay')
        .on('click', function () {
          $(this).siblings('.nav-drawer').collapse('hide');
        })
        .css('height', window.screen.height)
        .fadeIn();
    };

    $scope.onHide = function () {
      angular.element('nav-drawer')
        .children('.nav-drawer-overlay')
        .fadeOut(function () {
          angular.element('.nav-drawer-overlay').remove();
        });
    };

    $scope.redirectIfNoUserMinimalDetails = function ($event) {
      if (!User.hasMinimalDetails()) {
        $location.path('/user-details');
        $event.preventDefault();
      }
    };

    angular.element('nav-drawer').on('hide.bs.collapse', $scope.onHide);
    angular.element('nav-drawer').on('show.bs.collapse', $scope.onShow);
  });