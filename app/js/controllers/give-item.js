'use strict';

angular.module('givitApp')
  .controller('GiveItemCtrl', function ($scope, $routeParams, Items) {
    $scope.item = null;
    // var itemGuid = $routeParams.itemGuid;


    // if (!$scope.item) {
    //   // reroute to givit-list
    // }
    $scope.$on('selectGivitItem', function (event, itemGuid) {
      $scope.item = _.find(Items.$storage.cachedItems, function (item) {
        return item.GUID === itemGuid;
      });
      console.log($scope.item);
    });
  });