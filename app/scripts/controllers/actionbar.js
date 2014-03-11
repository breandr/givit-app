'use strict';

angular.module('givitApp')
  .controller('ActionBarCtrl', function ($scope, $route) {
  	$scope.currentRouteIs = function(routes){
  		if(typeof routes == 'string'){
  			routes = [routes];
  		}
  		
  		return routes.indexOf($route.current.templateUrl) > -1;
  	}
  });