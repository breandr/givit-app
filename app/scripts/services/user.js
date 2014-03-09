'use strict';

angular.module('givitApp')
  .service('User', function ($localStorage) {
    this.$storage = $localStorage;
    this.$storage.$default({
      userDetails: {}
    });

    this.setUserDetails = function (userDetails) {
      this.$storage.userDetails = userDetails;
    };

    this.clear = function () {
      delete this.$storage.userDetails;
    };
  });