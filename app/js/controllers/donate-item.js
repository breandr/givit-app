'use strict';

angular.module('givitApp')
  .controller('DonateItemCtrl', function ($scope, $rootScope, $http, Device, User, GivitApi, Feedback) {
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

    function onPhotoFail( /*message*/ ) {
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

    function onDonateSuccess(responseBody) {
      if (responseBody.DonorID > 0) {
        User.setDonorId(responseBody.DonorID);
      }

      $scope.item = angular.copy(pristine);
      angular.element('img.preview').hide();
      $scope.donateItemForm.$setPristine();
      window.scrollTo(0, 0);
      console.log(Feedback);
      Feedback.setStyle('success').setMessage('Thank you for pledgeing to give to someone in need. <i class="fa fa-heart-o"></i>').show(4000);
    }

    function onDonateError() {
      Feedback.setStyle('danger').setMessage('Something went wrong, and your pledge didn\'t make it through. <i class="fa fa-frown-o"></i>').show(4000);
    }

    function onDonate() {
      $rootScope.$broadcast('overlay.hide');
    }

    $scope.donateItem = function () {
      if (!$scope.donateItemForm.$valid) {
        return false;
      }

      var requestData = _.assign({}, User.$storage.userDetails, $scope.item);
      requestData.HasImage = $scope.item.ImageData && $scope.item.ImageData.length > 0;

      $rootScope.$broadcast('overlay.show');

      $http({
        method: 'POST',
        url: GivitApi.url + 'donations',
        data: requestData
      })
        .success(onDonateError)
        .error(onDonateError)
        .
      finally(onDonate);
    };
  });