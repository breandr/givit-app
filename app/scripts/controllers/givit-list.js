'use strict';

angular.module('givitApp')
  .controller('GivitListCtrl', function ($scope, User, Items /*, GivitList*/ ) {
    $scope.search = User.$storage.givitListSearch;
    $scope.items = Items.$storage.cachedItems;
    $scope.isLoadingItems = false;
    // $scope.items = GivitList.items;

    if (true || _.isEmpty($scope.items)) {
      //fItemName=lounge&fPostOnly=false&fPostcode=4000&fWithinKm=10
      Items.getItems();
    }

    $scope.loadMoreItems = function () {
      $scope.isLoadingItems = true;

      Items.getItems({
        pageNumber: 1
      }).then(function () {
        $scope.isLoadingItems = false;
      });
    };
  });