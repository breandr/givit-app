'use strict';

angular.module('givitApp').directive('actionBar', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/actionbar.html'
  };
});