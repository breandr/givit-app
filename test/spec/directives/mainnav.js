'use strict';

describe('Directive: MainNav', function () {

  // load the directive's module
  beforeEach(module('givitAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-main-nav></-main-nav>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the MainNav directive');
  }));
});
