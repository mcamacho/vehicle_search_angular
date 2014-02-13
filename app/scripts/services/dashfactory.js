'use strict';

angular.module('vehicleSearchAngularApp')
  .factory('dashFactory', ['$location', function($location) {
    return {
      keys: function(obj) {
        var keyarray = [];
        angular.forEach(obj, function(value, key) {
          this.push(key);
        }, keyarray);
        return keyarray;
      },
      values: function(obj, obvalue) {
        var valuearray = [];
        angular.forEach(obj, function(value) {
          this.push(value[obvalue]);
        }, valuearray);
        return valuearray;
      },
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
