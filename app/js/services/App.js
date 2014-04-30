'use strict';

angular.module('givitApp')
  .service('App', function ($route) {
    this.currentRouteIs = function (routes) {
      if (typeof routes === 'string') {
        routes = [routes];
      }
      
      return routes.indexOf($route.current.templateUrl) > -1;
    };
  });