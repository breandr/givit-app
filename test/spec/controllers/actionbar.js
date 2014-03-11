'use strict';

describe('Controller: ActionbarCtrl', function () {

  // load the controller's module
  beforeEach(module('givitAppApp'));

  var ActionbarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActionbarCtrl = $controller('ActionbarCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
