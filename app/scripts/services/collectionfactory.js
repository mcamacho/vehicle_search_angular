'use strict';

angular.module('vehicleSearchAngularApp')
  .factory('collectionFactory', function() {
    return function(vehicleQuery) {
      var loader = {
        _load: function() {
          var self = this;
          vehicleQuery.fetchFunction(function(items) {
              self.items = items;
            });
        }
      };
      loader._load();
      return loader;
    };
  });
