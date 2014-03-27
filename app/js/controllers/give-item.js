'use strict';

angular.module('givitApp')
  .controller('GiveItemCtrl', function ($scope, $routeParams, Items, Device) {
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
      $scope.item.qty = 1;
      $scope.item.photo = '';
    });

    var onSuccess = function (imageUri) {
      imageUri = imageUri;
    };

    var onFail = function (message) {
      window.alert(message);
    };

    $scope.takePhoto = function ($event) {
      if (Device.hasCamera()) {
        Device.takePhoto(onSuccess, onFail);
        $event.preventDefault();
      }
    };

    $scope.selectPhoto = function ($event) {
      if (Device.hasCamera()) {
        Device.selectPhotoFromGallery(onSuccess, onFail);
        $event.preventDefault();
      }
    };
  });