'use strict';

angular.module('givitApp')
  .controller('NavDrawerCtrl', function ($scope) {
    $scope.user = {};
    $scope.user.guid = '79cbeb7e-d5ee-4f56-bd50-a5700abef833';
    $scope.user.name = 'Brett Andrews';
    $scope.user.email = 'brett.j.andrews@gmail.com';
  });
