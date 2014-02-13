'use strict';

describe('Filter: mkFilter', function () {

  // load the filter's module
  beforeEach(module('vehicleSearchAngularApp'));

  // initialize a new instance of the filter before each test
  var mkFilter;
  beforeEach(inject(function ($filter) {
    mkFilter = $filter('mkFilter');
  }));

  it('should return the input prefixed with "mkFilter filter:"', function () {
    var text = 'angularjs';
    expect(mkFilter(text)).toBe('mkFilter filter: ' + text);
  });

});
