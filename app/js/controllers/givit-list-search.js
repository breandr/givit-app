'use strict';

angular.module('givitApp')
  .controller('GivitListSearchCtrl', function ($scope, $rootScope, $route, User, App) {
    // $scope.$on('navDrawer.show', function hide() {
    //   $scope.hide();
    // });

    $scope.show = function () {
      angular.element('#givit-list-search-form-container').collapse('show');
    };

    $scope.hide = function () {
      angular.element('#givit-list-search-form-container').collapse('hide');
    };

    $scope.currentRouteIs = function (routes) {
      return App.currentRouteIs(routes);
    };

    function onShow() {
      window.alert(1);
      $rootScope.$broadcast('givitListSearch.show');
    }

    function onHide() {
      window.alert(2);
    }

    $scope.clearSearch = function () {
      $scope.filter = User.$storage.givitListSearch = {};
      $scope.hide();
      window.scrollTo(0, 0);
      $scope.loadItems('set');
    };

    $scope.search = function () {
      $scope.pageNumber = 1;
      $scope.hide();
      $scope.loadItems('set');
    };

    console.log(angular.element('#givit-list-search-form-container'));
    angular.element('#givit-list-search-form-container')
      .on('show.bs.collapse', onShow)
      .on('hide.bs.collapse', onHide);
    // $scope.show();
  });