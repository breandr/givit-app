'use strict';

angular.module('givitApp')
  .controller('GivitListCtrl', function ($rootScope, $scope, User, Items) {
    $scope.filter = $scope.$watch(function () {
      return User.$storage.givitListSearch;
    }, function (givitListSearch) {
      $scope.filter = givitListSearch;
    });
    $scope.items = $scope.$watch(function () {
      return Items.$storage.cachedItems;
    }, function (cachedItems) {
      $scope.items = cachedItems;
    });

    $scope.isLoadingItems = false;
    $scope.pageNumber = 1;

    $scope.clearSearch = function (e) {
      User.$storage.givitListSearch = {};
      $scope.hideSearch();
      e.preventDefault();
    };

    $scope.search = function () {
      $scope.pageNumber = 1;
      $scope.hideSearch();
      $scope.loadItems('set');
    };

    $scope.hideSearch = function(){
      $('#givit-list-search-form-container').collapse('hide');
    };

    $scope.loadItems = function (addMode) {
      addMode = addMode || 'set';
      $scope.isLoadingItems = true;

      Items.getItems({
        pageNumber: $scope.pageNumber++,
        fPostcode: $scope.filter.postcode,
        fWithinKm: $scope.filter.km
      }, addMode).then(function () {
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

    if (_.isEmpty($scope.items)) {
      $scope.loadItems();
    }
  });