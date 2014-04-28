'use strict';

angular.module('givitApp')
  .controller('ActionBarCtrl', function ($scope, $route, $rootScope) {
    $scope.isSearchShown = false;

    $scope.toggleNavDrawer = function(){
      var hideOrShow = angular.element('.nav-drawer').hasClass('collapse') ? 'show' : 'hide';
      
      $rootScope.$broadcast('toggleNavDrawer', hideOrShow);
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