'use strict';

describe('Service: Donateitem', function () {

  // load the service's module
  beforeEach(module('givitApp'));

  // instantiate service
  var Donateitem;
  beforeEach(inject(function (_Donateitem_) {
    Donateitem = _Donateitem_;
  }));

  it('should do something', function () {
    expect(!!Donateitem).toBe(true);
  });

});
