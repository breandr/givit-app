'use strict';

angular.module('givitApp')
  .controller('GivitListCtrl', function ($rootScope, $scope, $location, User, Items, Feedback) {
    $scope.items = {}; //Items.$storage.cachedItems;
    $scope.isLoadingItems = Items.isLoading;

    $scope.$on('$locationChangeStart', function onLocationChangeStart() {
      Feedback.hide();
    });

    $scope.$watch(function () {
      return Items.isLoading;
    }, function (isLoading) {
      $scope.isLoadingItems = isLoading;
    });

    $scope.$watch(function () {
      return Items.$storage.cachedItems;
    }, function (cachedItems) {
      $scope.items = cachedItems;
    });

    $scope.loadItems = function (loadMode) {
      Items.getItems(loadMode);
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
      if (User.hasMinimalDetails()) {
        angular.element('#giveItemConfirmationModal').modal('show');
        $rootScope.$broadcast('selectGivitItem', itemGuid);
      } else {
        $location.path('/user-details');
      }
    };

    // Ideally, this would poll the server for new and removed items to update the local cache.
    // For simplicity we are just going to get new items
    // if (_.isEmpty($scope.items)) {
    $scope.loadItems();
    // }
  });