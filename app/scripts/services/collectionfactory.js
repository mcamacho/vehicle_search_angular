'use strict';

angular.module('vehicleSearchAngularApp')
  .factory('collectionFactory', function(_) {
    return function(mainData) {
      var collection = {
        list: mainData,
        menucategories: function(obj) {
          var menuObj = _.pick(obj, function(objVal) {
            return _.has(objVal, 'menuorder');
          });
          var category = _.mapValues(menuObj, function(objVal, keyVal) {
            var values = _.pluck(this.list, keyVal);
            var countValues = _.countBy(values, function(val) {
              return val;
            });
            return countValues;
          }, this);
          return category;
        }
      };
      return collection;
    };
  });
