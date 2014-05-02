'use strict';

angular.module('givitApp')
  .directive('navDrawer', function () {
    return {
      templateUrl: 'views/navdrawer.html',
      restrict: 'E',
      replace: true,
      controller: function ($scope, $element) {
        function slideNavButtonLeft() {
          angular.element('.navbar-header .navbar-toggle .fa-bars').css('left', '-25px');
        }

        function slideNavButtonRight() {
          angular.element('.navbar-header .navbar-toggle .fa-bars').css('left', '-15px');
        }

        function showOverlay() {
          angular
            .element('.content-area')
            .first()
            .after($('<div class="nav-drawer-overlay modal-backdrop animated fadeIn" />'))
            .siblings('.nav-drawer-overlay')
            .on('click', function () {
              hide();
            })
            .show();
        }

        function hideOverlay() {
          angular
            .element('.content-area')
            .first()
            .siblings('.nav-drawer-overlay')
            .removeClass('fadeIn')
            .addClass('fadeOut')
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
              angular.element(this).remove();
            });
        }

        function showNavDrawer() {
          $element
            .show()
            .removeClass('fadeOutLeft')
            .addClass('fadeInLeft toggling')
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
              angular
                .element(this)
                .removeClass('toggling');
            });
        }

        function hideNavDrawer() {
          $element
            .removeClass('fadeInLeft')
            .addClass('fadeOutLeft toggling')
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
              angular
                .element(this)
                .hide()
                .removeClass('toggling');
            });
        }

        function show() {
          if (!$element.hasClass('fadeOutLeft')) {
            return false;
          }

          slideNavButtonLeft();
          showNavDrawer();
          showOverlay();
        }

        function hide() {
          if (!$element.hasClass('fadeInLeft')) {
            return false;
          }

          slideNavButtonRight();
          hideNavDrawer();
          hideOverlay();
        }

        $scope.$on('navDrawer.show', show);

        $scope.$on('navDrawer.hide', hide);
      }
    };
  });