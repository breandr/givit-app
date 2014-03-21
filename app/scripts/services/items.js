'use strict';

angular.module('givitApp')
  .service('Items', function ($localStorage, $http, GivitApi) {
    this.$storage = $localStorage;
    this.$storage.$default({
      cachedItems: [],
      hiddenItems: []
    });

    /**
     * Maps remote data to reduce and modify (esp. delivery methods) data stored in local storage
     * @param  {Array} items Items returned from the API
     * @return {Array}       Data to be stored in local storage
     */
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
          HasImg: false,
          DeliveryMethods: item.DeliveryMethods
        };
      });
    }

    /**
     * Gets items from API
     * @param  {Object} params  Request parameters
     * @param  {String} addMode Can be `set` (default) or `add`
     * @return {Promise}
     */
    this.getItems = function (params, addMode) {
      params = params || {};
      addMode = addMode || 'set';

      _.defaults(params, {
        pageNumber: 1,
        rowsPerPage: 15,
        fItemName: '',
        fPostOnly: false,
        fPostcode: '',
        fWithinKm: 0
      });

      /**
       * Updates local storage with data returned from API. Defined as variable to allow `bind`
       * @param  {Object} response Response from API
       */
      var updateCachedItems = function (response) {
        var items = response.data.Data;

        items = mapData(items);

        if (addMode === 'set') {
          this.setCachedItems(items);
        } else {
          this.addItemsToCache(items);
        }
      };

      return $http({
        method: 'GET',
        url: GivitApi.url + 'givit-list',
        params: params
      }).then(updateCachedItems.bind(this));
    };

    this.addItemsToCache = function (items) {
      this.$storage.cachedItems = _.uniq(_.union(this.$storage.cachedItems, items), false, function (item) {
        return item.GUID;
      });
    };

    this.setCachedItems = function (items) {
      this.$storage.cachedItems = items;
    };

    this.clearCachedItems = function () {
      delete this.$storage.cachedItems;
    };

    this.hideItem = function (itemGuid) {
      this.$storage.hiddenItems.push(itemGuid);

      this.$storage.cachedItems = _.reject(this.$storage.cachedItems, function (item) {
        return item.GUID === itemGuid;
      });
    };
  });