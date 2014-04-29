'use strict';

angular.module('givitApp')
  .controller('UserDetailsCtrl', function ($scope, User/*, InfoMsg*/) {
    $scope.user = User.$storage.userDetails;

    // if (User.hasMinimalDetails()) {
    //   InfoMsg.hide();
    // } else {
    //   InfoMsg.setMessage('Please enter your name and email address, and agree to the Terms of Participation.').show();
    // }

    $scope.$watch(function () {
      User.setUserDetails($scope.user);
    });
  });