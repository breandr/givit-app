'use strict';

describe('Directive: actionBar', function () {

  // load the directive's module
  beforeEach(module('givitApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<action-bar></action-bar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ActionBar directive');
  }));
});
