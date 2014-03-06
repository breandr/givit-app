'use strict';

describe('Controller: TermsOfParticipationCtrl', function () {

  // load the controller's module
  beforeEach(module('givitApp'));

  var TermsOfParticipationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TermsOfParticipationCtrl = $controller('TermsOfParticipationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
