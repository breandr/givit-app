'use strict';

angular.module('givitApp')
  .controller('ActionBarCtrl', function ($scope, $rootScope, $route) {
    $scope.isSearchShown = false;

    $scope.$on('navDrawer.show', function hideGivitSearchList() {
      $scope.hideGivitSearchList();
    });

    $scope.showGivitSearchList = function () {
      angular.element('#givit-list-search-form-container').collapse('show');
    };

    $scope.hideGivitSearchList = function () {
      angular.element('#givit-list-search-form-container').collapse('hide');
    };

    $scope.currentRouteIs = function (routes) {
      if (typeof routes === 'string') {
        routes = [routes];
      }

      return routes.indexOf($route.current.templateUrl) > -1;
    };

    function onShowGivitSearchList() {
      alert(1);
      $rootScope.$broadcast('actionBar.givitListSearch.show');
    };

    function onHideGivitSearchList() {
      alert(2);
    };
console.log(angular.element('#givit-list-search-form-container'));
    angular.element('#givit-list-search-form-container')
    .on('show.bs.collapse', onShowGivitSearchList)
    .on('hide.bs.collapse', onHideGivitSearchList);
    $scope.showGivitSearchList();
  });