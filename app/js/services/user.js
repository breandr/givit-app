'use strict';

angular.module('givitApp')
  .service('User', function ($localStorage) {
    this.$storage = $localStorage;
    this.$storage.$default({
      userDetails: {},
      givitListSearch: {
        postcode: '',
        km: ''
      },
      // nav: Navigate the app from here
      // <open nav to explain each page>
      // givit list: See what items charities have requested for someone in need
      // donate items: Tell us of items you have that you would like to give to someone in need
      // my details: Enter your details so we can contact you when giving
      // about: Want to know more about Givit?
      // <set showIntro false>
      showIntro: true
    });

    this.setDonorId = function (donorId) {
      this.$storage.userDetails.DonorID = donorId;
    };

    this.setUserDetails = function (userDetails) {
      this.$storage.userDetails = userDetails;
    };

    this.clear = function (key) {
      delete this.$storage[key];
    };

    this.detailExists = function (detail) {
      var details = this.$storage.userDetails,
        value = details[detail];

      return typeof value !== 'undefined' && value;
    };

    this.hasMinimalDetails = function () {
      var details = this.$storage.userDetails;

      return _.every(['Firstname', 'Surname', 'EmailAddress', 'TermsOfParticipation'], this.detailExists.bind(this)) && details.TermsOfParticipation;
    };
  });