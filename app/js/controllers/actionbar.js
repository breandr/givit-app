'use strict';

angular.module('givitApp')
  .controller('ActionBarCtrl', function ($scope, $rootScope, App) {
    $scope.currentRouteIs = function (routes) {
      return App.currentRouteIs(routes);
    };

    $scope.toggleGivitListSearch = function () {
      var givitListSearchEl = angular.element('#givit-list-search-form-container');

      if (givitListSearchEl.hasClass('toggling')) {
        return false;
      } else if (givitListSearchEl.hasClass('fadeInDown')) {
        $rootScope.$broadcast('givitListSearch.hide');
      } else {
        $rootScope.$broadcast('givitListSearch.show');
      }
    };

    $scope.toggleNavDrawer = function () {
      var navDrawerEl = angular.element('#navigation-drawer');

      if (navDrawerEl.hasClass('toggling')) {
        return false;
      } else if (navDrawerEl.hasClass('fadeInLeft')) {
        $rootScope.$broadcast('navDrawer.hide');
      } else {
        $rootScope.$broadcast('navDrawer.show');
      }
    };
  });