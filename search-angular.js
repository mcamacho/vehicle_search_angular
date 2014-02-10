/*global angular*/
'use strict';
angular.module('filters', [])
  .filter('fulltext', ['$filter', function($filter) {
    return function(items, text) {
      if (!text || text.length === 0)
      return items;

      // split search text on space
      var searchTerms = text.split(' ');

      // search for single terms.
      // this reduces the item list step by step
      searchTerms.forEach(function(term) {
        if (term && term.length)
          items = $filter('filter')(items, term);
      });

      return items;
    };
  }]);
angular.module('services', [])
  .factory('dbVehicleValues', ['dash', function dbVehValFactory(dash) {
      return function(vehicleQuery) {
        var loader = {
          _load: function() {
            var self = this;
            vehicleQuery.fetchFunction(function(items) {
                self.items = items;
                self.categories = dash.keys({ name: 'm', last: 'c' });
              });
          }
        };
        loader._load();
        return loader;
      };
    }])
  .factory('dash', ['$location', function dashFactory($location) {
    return {
      keys: function(obj) {
        var keyarray = [];
        angular.forEach(obj, function(value, key) {
          this.push(key);
        }, keyarray);
        return keyarray;
      },
      dlocation: $location
    };
  }]);

var app = angular.module('project', ['services', 'filters']);
app.controller('GenCtrl', ['$scope', '$http', 'dbVehicleValues', 'dash', function($scope, $http, dbVehicleValues, dash) {
  var vehicleKeyQueryV1 = {
      year: { menuorder: 5 },
      make: { menuorder: 10 },
      model: { menuorder: 15 },
      trim: { menuorder: 16 },
      standard_body: {
        menuorder: 20,
        viewas: 'body'
      },
      exterior_color: {
        menuorder: 25,
        viewas: 'color'
      },
      transmission: { menuorder: 30 },
      price: { slideorder: 5 },
      mileage: { slideorder: 10 },
      vin: {},
      image_1: {},
      ext_color_code: {},
      evox_id: {}
    };
  var vehiclesKeys = dash.keys(vehicleKeyQueryV1);
  var callParams = {
    f: 'json',
    show: '100',
    type: 'used',
    k: vehiclesKeys.toString()
  };
  var fetchFunction = function(callback) {
    $http.get(dash.dlocation.protocol() + '://' + dash.dlocation.host() + '/api/?', {
      params: callParams
    })
      .success(callback);
  };
  var vehicleQuery = {
    fetchFunction: fetchFunction,
    vehiclesKeys: vehiclesKeys
  };
  $scope.searchLoader = dbVehicleValues(vehicleQuery);
}]);