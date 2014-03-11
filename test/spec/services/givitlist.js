'use strict';

describe('Service: Givitlist', function () {

  // load the service's module
  beforeEach(module('givitAppApp'));

  // instantiate service
  var Givitlist;
  beforeEach(inject(function (_Givitlist_) {
    Givitlist = _Givitlist_;
  }));

  it('should do something', function () {
    expect(!!Givitlist).toBe(true);
  });

});
