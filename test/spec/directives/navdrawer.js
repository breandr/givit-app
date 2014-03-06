'use strict';

describe('Directive: navDrawer', function () {

  // load the directive's module
  beforeEach(module('givitApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<nav-drawer></nav-drawer>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the navDrawer directive');
  }));
});
