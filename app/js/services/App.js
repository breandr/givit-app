'use strict';

angular.module('givitApp')
  .service('App', function ($route) {
    this.currentRouteIs = function (routes) {
      //Error thrown on page load because $route.current is not initialised before checks are performed
      if (typeof $route.current === 'undefined') {
        return false;
      }

      if (typeof routes === 'string') {
        routes = [routes];
      }

      return routes.indexOf($route.current.templateUrl) > -1;
    };
  });