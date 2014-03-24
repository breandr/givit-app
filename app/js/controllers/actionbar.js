'use strict';

angular.module('givitApp')
  .controller('ActionBarCtrl', function ($scope, $route, GivitList) {
    $scope.isGivitListSearchShown = function () {
      return GivitList.isSearchShown;
    };

    $scope.showGivitListSearch = function () {
      GivitList.isSearchShown = !GivitList.isSearchShown;
    };

    $scope.currentRouteIs = function (routes) {
      if (typeof routes === 'string') {
        routes = [routes];
      }

      return routes.indexOf($route.current.templateUrl) > -1;
    };
  });