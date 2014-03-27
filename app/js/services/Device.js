'use strict';

angular.module('givitApp')
  .service('Device', function () {
    this.isMobileDevice = function () {
      return false;
    };

    this.hasCamera = function () {
      return false;
    };

    this.hasGps = function () {
      return false;
    };

    this.selectPhotoFromGallery = function (onSuccess, onFail) {
      return this.getPhoto(Camera.PictureSourceType.SAVEDPHOTOALBUM, onSuccess, onFail);
    };

    this.takePhoto = function (onSuccess, onFail) {
      return this.getPhoto(Camera.PictureSourceType.CAMERA, onSuccess, onFail);
    };

    this.getPhoto = function(source, onSuccess, onFail){
      if (!this.hasCamera()) {
        console.warn('Device does not have a camera.');
        return false;
      }

      navigator.camera.getPicture(success, fail, {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        correctOrientation: true
      });
    };
  });