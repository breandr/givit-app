'use strict';

angular.module('givitApp').directive('overlay', function () {
  return {
    restrict: 'E',
    replace: true,
    controller: function ($scope, $element) {
      $scope.message = '<div class="text-center"><i class="fa fa-repeat fa-spin"></i></div>';

      $scope.$on('overlay.show', function showOverlay() {
        $element
          .show()
          .removeClass('fadeOut')
          .addClass('fadeIn');
      });

      $scope.$on('overlay.hide', function hideOverlay() {
        $element
          .removeClass('fadeIn')
          .addClass('fadeOut')
          .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            angular.element(this).hide();
          });
      });
    },
    templateUrl: 'views/overlay.html'
  };
});