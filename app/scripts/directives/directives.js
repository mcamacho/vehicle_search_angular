'use strict';

angular.module('vehicleSearchAngularApp')
  .directive('mkFocus', function () {
    return function (scope, element, attrs) {
      scope.$watch(attrs.mkFocus, function(value) {
        if(!value) {
          element[0].focus();
        }
      });
    };
  });
