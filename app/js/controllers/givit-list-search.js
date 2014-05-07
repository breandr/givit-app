'use strict';

angular.module('givitApp')
  .controller('GivitListSearchCtrl', function ($scope, $rootScope, $route, User, App, Items) {
    $scope.filter = _.clone(User.$storage.givitListSearch);

    // $scope.$watch(function () {
    //   return User.$storage.givitListSearch;
    // }, function (givitListSearch) {
    //   $scope.filter = givitListSearch;
    // });

    $scope.$on('navDrawer.show', function hide() {
      $scope.hide();
    });

    $scope.show = function () {
      $rootScope.$broadcast('givitListSearch.show');
    };

    $scope.hide = function () {
      $rootScope.$broadcast('givitListSearch.hide');
    };

    $scope.currentRouteIs = function (routes) {
      return App.currentRouteIs(routes);
    };

    $scope.clearSearch = function () {
      window.scrollTo(0, 0);
      $scope.hide();
      $scope.givitListSearchForm.submitted = false;

      if (_.isEmpty(User.$storage.givitListSearch)) {
        return;
      }

      $scope.filter = User.$storage.givitListSearch = {};
      Items.getItems('set');
    };

    $scope.search = function () {
      $scope.givitListSearchForm.submitted = true;
      
      if ($scope.givitListSearchForm.$invalid) {
        angular.element('#givit-list-search-form .ng-invalid:first').focus();
        return false;
      }

      window.scrollTo(0, 0);
      $scope.filter.pageNumber = 1;
      $scope.hide();
      User.$storage.givitListSearch = $scope.filter;
      Items.getItems('set').then(function () {
        $scope.givitListSearchForm.submitted = false;
      });
    };
  });