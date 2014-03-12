'use strict';

describe('Controller: GiveItemCtrl', function () {

  // load the controller's module
  beforeEach(module('givitApp'));

  var GiveItemCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GiveItemCtrl = $controller('GiveItemCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
