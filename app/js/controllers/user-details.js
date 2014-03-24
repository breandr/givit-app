'use strict';

angular.module('givitApp')
  .controller('UserDetailsCtrl', function ($scope, User) {
    $scope.user = User.$storage.userDetails;
  });