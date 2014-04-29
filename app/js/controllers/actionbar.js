'use strict';

angular.module('givitApp')
  .controller('ActionBarCtrl', function ($scope, $route) {
    $scope.isSearchShown = false;

    $scope.toggleNavDrawer = function(){
      angular.element('.nav-drawer').collapse('toggle');
    };
    
    $scope.showGivitListSearch = function () {
      $scope.isSearchShown = !$scope.isSearchShown;
    };

    $scope.currentRouteIs = function (routes) {
      if (typeof routes === 'string') {
        routes = [routes];
      }

      return routes.indexOf($route.current.templateUrl) > -1;
    };
  });