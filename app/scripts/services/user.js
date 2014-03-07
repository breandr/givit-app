'use strict';

angular.module('givitApp')
  .service('User', function ($localStorage) {
    // var userDetails = {
    //   guid: '79cbeb7e-d5ee-4f56-bd50-a5700abef833',
    //   name: 'Brett Andrews',
    //   email: 'brett.j.andrews@gmail.com'
    // };

    this.$storage = $localStorage;

    this.setUserDetails = function (userDetails) {
      this.$storage.userDetails = userDetails;
    };

    this.clear = function () {
      delete this.$storage.userDetails;
    };
  });