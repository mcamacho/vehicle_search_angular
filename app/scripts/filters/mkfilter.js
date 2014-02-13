'use strict';

angular.module('vehicleSearchAngularApp')
  .filter('mkFilter', function () {
    return function (input) {
      return 'mkFilter filter: ' + input;
    };
  });