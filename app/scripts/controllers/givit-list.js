'use strict';

angular.module('givitApp')
  .controller('GivitListCtrl', function ($scope, User, GivitList) {
    $scope.search = User.$storage.givitListSearch;
    
    $scope.items = GivitList.items;
  });