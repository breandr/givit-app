'use strict';

angular.module('givitApp')
  .controller('GiveItemCtrl', function ($scope, $routeParams, Items) {
    $scope.item = null;

    $scope.getDeliveryMethods = function () {
      var deliveryMethods = $scope.item && $scope.item.DeliveryMethods;

      if (deliveryMethods) {
        return Items.getDeliveryMethodsMarkup(deliveryMethods);
      }
    };

    $scope.$on('selectGivitItem', function (event, itemGuid) {
      $scope.item = _.find(Items.$storage.cachedItems, function (item) {
        return item.GUID === itemGuid;
      });
    });
  });