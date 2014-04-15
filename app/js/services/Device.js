'use strict';

angular.module('givitApp')
  .service('Device', function () {
    this.isMobileDevice = function () {
      return false;
    };

    this.hasCamera = function () {
      return typeof navigator.camera !== 'undefined';
    };

    this.hasGps = function () {
      return typeof navigator.geolocation !== 'undefined';
    };

    this.getGeoLocation = function(onSuccess, onFail){
      navigator.geolocation.getCurrentPosition(onSuccess, onFail);
    };

    this.selectPhotoFromLibrary = function (onSuccess, onFail) {
      return this.getPhoto(Camera.PictureSourceType.PHOTOLIBRARY, onSuccess, onFail);
    };

    this.selectPhotoFromSavedPhotos = function (onSuccess, onFail) {
      return this.getPhoto(Camera.PictureSourceType.SAVEDPHOTOALBUM, onSuccess, onFail);
    };

    this.takePhoto = function (onSuccess, onFail) {
      return this.getPhoto(Camera.PictureSourceType.CAMERA, onSuccess, onFail);
    };

    this.getPhoto = function (source, onSuccess, onFail) {
      if (!this.hasCamera()) {
        console.warn('Device does not have a camera.');
        return false;
      }

      navigator.camera.getPicture(onSuccess, onFail, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: source,
        correctOrientation: true
      });
    };
  });