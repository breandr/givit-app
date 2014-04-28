'use strict';

angular.module('givitApp')
  .service('Items', function ($localStorage, $http, GivitApi) {
    this.$storage = $localStorage;
    this.$storage.$default({
      cachedItems: [],
      hiddenItems: []
    });

    /**
     * Get markup to present delivery methods with icons
     * @param  {Array} deliveryMethods An array of delivery methods available to the item
     * @return {String}                Markup representing delivery methods with icons
     */
    this.getDeliveryMethodsMarkup = function (deliveryMethods) {
      var deliveryMethodMarkup = '',
        deliveryMethodIconClasses = {
          'Pick Up': 'fa-home',
          'Drop Off': 'fa-truck',
          'Post': 'fa-dropbox'
        };

      _.each(deliveryMethods, function (value) {
        deliveryMethodMarkup += '<span class="delivery-method"><i class="fa ' + deliveryMethodIconClasses[value] + '" />' + value + '</span>';
      });

      return deliveryMethodMarkup;
    };

    /**
     * Maps remote data to reduce and modify (esp. delivery methods) data stored in local storage
     * @param  {Array} items Items returned from the API
     * @return {Array}       Data to be stored in local storage
     */
    function mapData(items) {
      return _.map(items, function (item) {
        item.DeliveryMethods = [];
        _.each({
          'Pick Up': item.CharityCanPickUp,
          'Drop Off': item.DonorCanDropOff,
          'Post': item.DonorCanPost
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
          Recipient: item.Recipient,
          RecipientDescription: item.RecipientDescription,
          HasImg: false,
          DeliveryMethods: item.DeliveryMethods,
          DateListed: item.DateListed
        };
      });
    }

    this.rejectHiddenItems = function (items) {
      var hiddenItems = this.$storage.hiddenItems;
      return _.reject(items, function (item) {
        return _.contains(hiddenItems, item.GUID);
      });
    };

    /**
     * Gets items from API
     * @param  {Object} params  Request parameters
     * @param  {String} loadMode Can be `set` (default) or `add`
     * @return {Promise}
     */
    this.getItems = function (params, loadMode) {
      params = params || {};
      loadMode = loadMode || 'set';

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

        items = this.rejectHiddenItems(mapData(items));

        if (loadMode === 'set') {
          this.setCachedItems(items);
        } else {
          this.addItemsToCache(items);
        }
      };

      return $http({
        method: 'GET',
        url: GivitApi.url + 'givitlist',
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