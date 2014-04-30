'use strict';

angular.module('givitApp').directive('overlay', function () {
  return {
    restrict: 'E',
    replace: true,
    controller: function ($scope, $element, $attrs) {
      $scope.message = '<p class="text-center">Loading....</p>';
      
      $scope.$on('overlay.show', function showOverlay() {
        $element.modal('show');
      });

      $scope.$on('overlay.hide', function hideOverlay() {
        $element.modal('hide');
      });
    },
    templateUrl: 'views/overlay.html'
  };
});