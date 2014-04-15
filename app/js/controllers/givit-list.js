'use strict';

angular.module('givitApp')
  .controller('GivitListCtrl', function ($rootScope, $scope, User, Items) {
    $scope.filter = User.$storage.givitListSearch;
    $scope.items = Items.$storage.cachedItems;
    $scope.isLoadingItems = false;
    $scope.pageNumber = 1;

    $scope.$watch(function () {
      return User.$storage.givitListSearch;
    }, function (givitListSearch) {
      $scope.filter = givitListSearch;
    });
    $scope.$watch(function () {
      return Items.$storage.cachedItems;
    }, function (cachedItems) {
      $scope.items = cachedItems;
    });

    $scope.clearSearch = function () {
      $scope.filter = User.$storage.givitListSearch = {};
      $scope.hideSearch();
      window.scrollTo(0, 0);
      $scope.loadItems('set');
    };

    $scope.search = function () {
      $scope.pageNumber = 1;
      $scope.hideSearch();
      $scope.loadItems('set');
    };

    $scope.hideSearch = function () {
      $('#givit-list-search-form-container').collapse('hide');
    };

    $scope.loadItems = function (loadMode) {
      loadMode = loadMode || 'set';
      $scope.isLoadingItems = true;

      Items.getItems({
        pageNumber: $scope.pageNumber++,
        fPostcode: $scope.filter.postcode,
        fWithinKm: $scope.filter.km
      }, loadMode).then(function () {
        $scope.isLoadingItems = false;
      });
    };

    $scope.hideItem = function (itemGuid, $event) {
      $($event.target.parentNode.parentNode)
        .addClass('animated fadeOutUp')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
          Items.hideItem(itemGuid);
          $scope.$apply();
        });
    };

    $scope.getDeliveryMethods = function (deliveryMethods) {
      return Items.getDeliveryMethodsMarkup(deliveryMethods);
    };

    $scope.selectGivitItem = function (itemGuid) {
      $rootScope.$broadcast('selectGivitItem', itemGuid);
    };

    // Ideally, this would poll the server for new and removed items to update the local cache.
    // For simplicity we are just going to get new items
    if (_.isEmpty($scope.items)) {
      $scope.loadItems();
    }
  });