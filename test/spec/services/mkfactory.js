'use strict';

describe('Service: mkFactory', function () {

  // load the service's module
  beforeEach(module('vehicleSearchAngularApp'));

  // instantiate service
  var mkFactory;
  beforeEach(inject(function (_mkFactory_) {
    mkFactory = _mkFactory_;
  }));

  it('should do something', function () {
    expect(!!mkFactory).toBe(true);
  });

});
