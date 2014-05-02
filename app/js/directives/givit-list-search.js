'use strict';

angular.module('givitApp').directive('givitListSearch', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/givit-list-search.html',
    controller: function ($scope, $element) {
      $scope.$on('givitListSearch.show', function showSearch() {
        if(!$element.hasClass('fadeOutUp')){
          return false;
        }

        $element
          .show()
          .removeClass('fadeOutUp')
          .addClass('fadeInDown toggling')
          .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            angular
              .element(this)
              .removeClass('toggling');
          });
      });

      $scope.$on('givitListSearch.hide', function hideSearch() {
        if(!$element.hasClass('fadeInDown')){
          return false;
        }
        
        $element
          .removeClass('fadeInDown')
          .addClass('fadeOutUp toggling')
          .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            angular
              .element(this)
              .hide()
              .removeClass('toggling');
          });
      });
    }
  };
});