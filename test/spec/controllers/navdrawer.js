'use strict';

describe('Controller: NavdrawerCtrl', function () {

  // load the controller's module
  beforeEach(module('givitApp'));

  var NavdrawerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavdrawerCtrl = $controller('NavdrawerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
