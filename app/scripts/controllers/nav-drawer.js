'use strict';

angular.module('givitApp')
  .controller('NavDrawerCtrl', function ($scope, User) {
    $scope.user = User.$storage.userDetails;

    $scope.hide = function () {
      $('.nav-drawer').collapse('hide');
    };
  });