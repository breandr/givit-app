'use strict';

angular.module('givitApp')
  .controller('GiveItemCtrl', function ($scope, $routeParams, GivitList) {
    var itemGuid = $routeParams.itemGuid;

    $scope.item = _.find(GivitList.items, function (item) {
      return item.guid === itemGuid;
    });

    if (!$scope.item) {
      // reroute to givit-list
    }
  });