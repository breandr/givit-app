'use strict';

angular.module('givitApp')
  .controller('GiveItemCtrl', function ($scope, $routeParams, GivitList) {
    var itemGuid = $routeParams.itemGuid;

    // change this to loop through items and find it
    $scope.item = GivitList.items[itemGuid];

    console.log($scope.item);
  });