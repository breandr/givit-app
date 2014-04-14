'use strict';

angular.module('givitApp')
  .controller('DonateItemCtrl', function ($scope/*, DonateItem*/) {
    $scope.item = {};
    $scope.item.qty = 1;

    function onPhotoSuccess (imageUri) {
      var image = angulr.element('myImage');
      image.prop('src', 'data:image/jpeg;base64,' + imageUri).show();

      $scope.imageUri = imageUri;
    };

    function onPhotoFail (message) {
      window.alert(message);
    };

    $scope.takePhoto = function ($event) {
      if (Device.hasCamera()) {
        Device.takePhoto(onPhotoSuccess, onPhotoFail);
        $event.preventDefault();
      }
    };

    $scope.selectPhoto = function ($event) {
      if (Device.hasCamera()) {
        Device.selectPhotoFromGallery(onPhotoSuccess, onPhotoFail);
        $event.preventDefault();
      }
    };

    $scope.giveItem = function () {
      var requestData = _.cloneDeep(User.$storage.userDetails);
      requestData.QuantityOffered = $scope.item.QuantityOffered;
      requestData.Image = $scope.imageUri;

      $http({
        method: 'POST',
        url: GivitApi.url + 'donate-item',
        data: requestData
      }).then(function () {
        $('#giveItemConfirmationModal').modal('hide');
      });
    };
  });