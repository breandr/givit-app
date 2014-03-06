'use strict';

describe('Controller: GivitListCtrl', function () {

  // load the controller's module
  beforeEach(module('givitApp'));

  var GivitListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GivitListCtrl = $controller('GivitListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
