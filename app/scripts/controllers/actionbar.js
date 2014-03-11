'use strict';

angular.module('givitApp')
  .controller('ActionBarCtrl', function ($scope, $route, GivitList) {
    $scope.isGivitListSearchShown = function () {
      console.log(GivitList.searchIsShown);
      return GivitList.searchIsShown;
    };

    $scope.showGivitListSearch = function () {
      GivitList.searchIsShown = !GivitList.searchIsShown;
    };

    $scope.currentRouteIs = function (routes) {
      if (typeof routes === 'string') {
        routes = [routes];
      }

      return routes.indexOf($route.current.templateUrl) > -1;
    };
  });