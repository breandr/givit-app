'use strict';

angular.module('givitApp')
  .controller('GiveItemCtrl', function ($scope, $routeParams, $http, Items, Device, User, GivitApi) {
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
      $scope.item.QuantityOffered = 1;
    });

    function onPhotoSuccess(imageUri) {
      var image = angular.element('img.preview');
      image.prop('src', 'data:image/jpeg;base64,' + imageUri).show();

      $scope.imageUri = imageUri;
    }

    function onPhotoFail(message) {
      window.alert(message);
    }

    $scope.takePhoto = function ($event) {
      if (Device.hasCamera()) {
        Device.takePhoto(onPhotoSuccess, onPhotoFail);
        $event.preventDefault();
      }
    };

    $scope.selectPhoto = function ($event) {
      if (Device.hasCamera()) {
        Device.selectPhotoFromSavedPhotos(onPhotoSuccess, onPhotoFail);
        $event.preventDefault();
      }
    };

    $scope.giveItem = function () {
      var requestData = _.assign({}, User.$storage.userDetails, $scope.item);
      requestData.ItemGuid = $scope.item.GUID;
      requestData.Image = $scope.imageUri;

      $http({
        method: 'POST',
        url: GivitApi.url + 'givitlist/respond',
        data: requestData
      }).then(function () {
        $('#giveItemConfirmationModal').modal('hide');
      });
    };
  });