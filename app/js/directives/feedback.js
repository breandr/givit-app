'use strict';

angular.module('givitApp').directive('feedback', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/feedback.html'
  };
});