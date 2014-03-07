'use strict';

angular.module('givitApp')
  .controller('NavDrawerCtrl', function ($scope, User) {
    $scope.user = User.$storage.userDetails;
    console.log(User);
  });