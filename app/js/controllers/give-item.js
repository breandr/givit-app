'use strict';

angular.module('givitApp')
  .controller('GiveItemCtrl', function ($scope, $rootScope, $routeParams, $http, Items, Device, User, GivitApi, Feedback) {
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

      $scope.item.ImageData = imageUri;
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

    function onRespondSuccess(responseBody) {
      if (responseBody.DonorID > 0) {
        User.setDonorId(responseBody.DonorID);
      }

      Items.hideItem($scope.item.GUID);
      Feedback.setStyle('success').setMessage('Thank you for pledgeing to give to someone in need. <i class="fa fa-heart-o"></i>').show(4000);
      angular.element('img.preview', '#giveItemConfirmationModal').hide();
      angular.element('#giveItemConfirmationModal').modal('hide');
    }

    function onRespondError() {
      Feedback.setStyle('danger').setMessage('Something went wrong, and your pledge didn\'t make it through. <i class="fa fa-frown-o"></i>').show(4000);
    }

    function onRespond() {
      $rootScope.$broadcast('overlay.hide');
    }

    $scope.giveItem = function () {
      var requestData = _.assign({}, User.$storage.userDetails, $scope.item);

      requestData.HasImage = $scope.item.ImageData && $scope.item.ImageData.length > 0;
      requestData.ItemGuid = $scope.item.GUID;

      $rootScope.$broadcast('overlay.show');

      $http({
        method: 'POST',
        url: GivitApi.url + 'givitlist/respond',
        data: requestData
      })
        .success(onRespondSuccess)
        .error(onRespondError)
        .
      finally(onRespond);
    };
  });