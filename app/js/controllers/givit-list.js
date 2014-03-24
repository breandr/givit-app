'use strict';

angular.module('givitApp')
  .controller('GivitListCtrl', function ($rootScope, $scope, User, Items) {
    $scope.search = User.$storage.givitListSearch;
    $scope.items = Items.$storage.cachedItems;
    $scope.isLoadingItems = false;
    $scope.pageNumber = 1;

    $scope.getDeliveryMethods = function (deliveryMethods) {
      return Items.getDeliveryMethodsMarkup(deliveryMethods);
    };

    $scope.selectGivitItem = function (itemGuid) {
      $rootScope.$broadcast('selectGivitItem', itemGuid);
    };

    $scope.loadItems = function (addMode) {
      addMode = addMode || 'set';
      $scope.isLoadingItems = true;

      Items.getItems({
        pageNumber: $scope.pageNumber++
      }, addMode).then(function () {
        $scope.isLoadingItems = false;
        $scope.items = Items.$storage.cachedItems;
      });
    };

    $scope.hideItem = function (itemGuid, $event) {
      $($event.target.parentNode.parentNode)
        .addClass('animated fadeOutUp')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
          $scope.items = Items.$storage.cachedItems;
          $scope.$apply();
        });

      Items.hideItem(itemGuid);
    };

    if (_.isEmpty($scope.items)) {
      $scope.loadItems();
    }
  });