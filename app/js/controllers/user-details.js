'use strict';

angular.module('givitApp')
  .controller('UserDetailsCtrl', function ($scope, User, Feedback) {
    $scope.user = User.$storage.userDetails;

    $scope.$on('$locationChangeStart', function onLocationChangeStart(){
      Feedback.hide();
    });

    $scope.$watch(function () {
      User.setUserDetails($scope.user);
      
      if (User.hasMinimalDetails()) {
        Feedback.hide();
      } else {
        Feedback.setStyle('info').setMessage('Please enter your details before donating items or responding to items the Givit List.').show();
      }
    });
  });