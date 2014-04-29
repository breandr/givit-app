'use strict';

angular.module('givitApp')
  .controller('DonateItemCtrl', function ($scope, $http, Device, User, GivitApi) {
    var pristine = {
      ItemName: '',
      ItemDescription: '',
      QuantityOffered: 1,
      ItemCondition: '',
      HoldItemDays: '',
      DonorCanDropOff: false,
      DonorCanPost: false,
      CharityCanPickUp: false
    };

    $scope.item = angular.copy(pristine);

    function onPhotoSuccess(imageData) {
      var image = angular.element('img.preview');
      image.prop('src', 'data:image/jpeg;base64,' + imageData).show();

      $scope.item.ImageData = imageData;
    }

    function onPhotoFail(/*message*/) {
      // window.alert(message);
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

    function onDonateSuccess(response) {
      if (response.data.DonorID > 0) {
        User.setDonorId(response.data.DonorID);
      }

      $scope.item = angular.copy(pristine);
      angular.element('img.preview').hide();
      $scope.donateItemForm.$setPristine();
      window.scrollTo(0, 0);
    }

    $scope.donateItem = function () {
      if (!$scope.donateItemForm.$valid) {
        return false;
      }

      var requestData = _.assign({}, User.$storage.userDetails, $scope.item);
      requestData.HasImage = $scope.item.ImageData && $scope.item.ImageData.length > 0;

      $http({
        method: 'POST',
        url: GivitApi.url + 'donations',
        data: requestData
      }).then(onDonateSuccess);
    };
  });