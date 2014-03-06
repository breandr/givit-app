'use strict';

describe('Controller: DonateItemCtrl', function () {

  // load the controller's module
  beforeEach(module('givitApp'));

  var DonateItemCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DonateItemCtrl = $controller('DonateItemCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
