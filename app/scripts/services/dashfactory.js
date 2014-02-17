'use strict';

angular.module('vehicleSearchAngularApp')
  .factory('dashFactory', ['$location', function($location) {
    return {
      queryValues: function(obj, obvalue) {
        var valuearray = [];
        angular.forEach(obj, function(value, key) {
          this.push(value[obvalue] === key ? value[obvalue] : value[obvalue] + '=' + key);
        }, valuearray);
        return valuearray;
      },
      dlocation: $location
    };
  }]);
