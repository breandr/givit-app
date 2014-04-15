'use strict';

angular.module('givitApp')
  .controller('DonateItemCtrl', function ($scope, $http, Device, User, GivitApi) {
    $scope.item = {};
    $scope.item.QuantityOffered = 1;

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

    $scope.donateItem = function () {
      if (!$scope.donateItemForm.$valid) {
        return false;
      }

      var requestData = _.assign({}, User.$storage.userDetails, $scope.item);
      requestData.Image = $scope.imageUri;

      $http({
        method: 'POST',
        url: GivitApi.url + 'give-items',
        data: requestData
      }).then(function () {
        $('#giveItemConfirmationModal').modal('hide');
      });
    };
  });