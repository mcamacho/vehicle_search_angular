'use strict';

angular.module('vehicleSearchAngularApp')
  .factory('collectionFactory', function(_) {
    return function(mainData) {
      var collection = {
        // caching whole list
        list: mainData,
        // creating a collection of categories with the menu property
        menucategories: function(obj) {
          var menuObj = _.pick(obj, function(objVal) {
            return _.has(objVal, 'menu');
          });
          var category = _.mapValues(menuObj, function(objVal, keyVal) {
            var values = _.remove(_.pluck(this.list, keyVal), function (ele) { return ele !== ''; });
            var countValues = _.countBy(values, function(val) {
              return val;
            });
            return {
              valueKey: keyVal,
              valueLabel: objVal.menu.valueLabel,
              order: objVal.menu.order,
              options: countValues
            };
          }, this);
          return _.sortBy(category, 'order');
        }

      };
      return collection;
    };
  });
