'use strict';

angular.module('givitApp')
  .service('Items', function ($localStorage, $http, GivitApi) {
    this.$storage = $localStorage;
    this.$storage.$default({
      cachedItems: {}
    });

    function mapData(items) {
      return _.map(items, function (item) {
        item.DeliveryMethods = [];

        _.each({
          'pick-up': item.CharityCanPickUp,
          'drop-off': item.DonorCanDropOff,
          'can-post': item.DonorCanPost
        }, function (val, key) {
          if (val) {
            item.DeliveryMethods.push(key);
          }
        });

        return {
          GUID: item.GUID,
          ItemName: item.ItemName,
          Location: item.Location,
          NumberDonationsRequried: item.NumberDonationsRequried,
          QuantityReserved: item.QuantityReserved,
          Recipient: item.Recipient,
          RecipientDescription: item.RecipientDescription,
          HasImg: true
        };
      });
    }

    this.getItems = function (params, addMode) {
      var updateCachedItems = function (response) {
        var items = response.data.Data;

        items = mapData(items);

        if (addMode === 'set') {
          this.setCachedItems(items);
        } else {
          this.addItemsToCache(items);
        }
      };

      params = params || {};
      addMode = addMode || 'set';

      _.defaults(params, {
        pageNumber: 1,
        rowsPerPage: 14,
        fItemName: '',
        fPostOnly: false,
        fPostcode: '',
        fWithinKm: 0
      });

      return $http({
        method: 'GET',
        url: GivitApi.url + 'givit-list',
        params: params
      }).then(updateCachedItems.bind(this));
    };

    this.addItemsToCache = function (items) {
      //untested
      _.uniq(_.union(this.$storage.cachedItems, items), false, function (item) {
        return item.GUID;
      });
    };

    this.setCachedItems = function (items) {
      this.$storage.cachedItems = items;
    };

    this.clear = function () {
      delete this.$storage.cachedItems;
    };
  });