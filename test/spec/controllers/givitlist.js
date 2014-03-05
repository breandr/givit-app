'use strict';

describe('Controller: GivitlistCtrl', function () {

  // load the controller's module
  beforeEach(module('givitAppApp'));

  var GivitlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GivitlistCtrl = $controller('GivitlistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
