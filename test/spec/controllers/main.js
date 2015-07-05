'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('garageApp'));
  beforeEach(module('ui.bootstrap'));
  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should define a number of parked cars in one page', function () {
    expect(scope.numPerPage).toBe(10);
  });

  it('should define a current page', function () {
    expect(scope.currentPage).toBe(1);
  });
});
