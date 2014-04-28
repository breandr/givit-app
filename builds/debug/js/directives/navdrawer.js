'use strict';

angular.module('givitApp')
  .directive('navDrawer', function () {
    return {
      templateUrl: 'views/navdrawer.html',
      restrict: 'E'
    };
  });
