'use strict';

angular.module('givitApp')
  .service('Items', function ($localStorage, $http) {
    this.$storage = $localStorage;
    this.$storage.$default({
      cachedItems: {}
    });

    this.getItems = function () {
      $http({
        method: 'GET',
        url: '//',
        params: {}
      }).then(function (data) {
        // Should append/override instead of just setting to data
        this.$storage.cachedItems = data;
      });
    };

    this.setCachedItems = function (items) {
      this.$storage.cachedItems = items;
    };

    this.clear = function () {
      delete this.$storage.cachedItems;
    };
  });