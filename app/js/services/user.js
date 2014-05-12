'use strict';

angular.module('givitApp')
  .service('User', function ($localStorage, Walkthrough) {
    var defaultUserDetails = {
      ContactNumber: '',
      EmailAddress: '',
      Firstname: '',
      Postcode: '',
      PreferredContactMethod: '',
      State: '',
      Suburb: '',
      Surname: '',
      TermsOfParticipation: false
    };

    this.$storage = $localStorage;
    this.$storage.$default({
      userDetails: _.clone(defaultUserDetails),
      givitListSearch: {
        postcode: '',
        km: ''
      }
    });

    this.setDonorId = function (donorId) {
      this.$storage.userDetails.DonorID = donorId;
    };

    this.setUserDetails = function (userDetails) {
      userDetails = _.assign({}, defaultUserDetails, userDetails);
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

      return _.every(['Firstname', 'Surname', 'EmailAddress', 'State', 'Postcode', 'TermsOfParticipation'], this.detailExists.bind(this)) && details.TermsOfParticipation;
    };
  });