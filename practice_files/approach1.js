angular.module('services', [])
  .factory('dbVehicleValues', ['dash', function dbVehValFactory(dash) {
      return function(vehicleQuery) {
        var loader = {
          _load: function() {
            var self = this;
            vehicleQuery.fetchFunction(function(items) {
                self.items = items;
                self.categories = vehicleQuery.vehiclesKeys;
                // self.categories = dash.keys({ name: "m", last: "c" });
              });
          }
        };
        loader._load();
        return loader;
      };
    }])
  .factory('dash', function dashFactory() {
    return {
      keys: function(obj) {
        var keyarray = [];
        angular.forEach(obj, function(value, key) {
          this.push(key);
        }, keyarray);
        return keyarray;
      }
    };
  });

var app = angular.module('project', ['services']);
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
      ext_color_code: {
        menuorder: 25,
        viewas: 'color'
      },
      transmission: { menuorder: 30 },
      price: { slideorder: 5 },
      mileage: { slideorder: 10 },
      vin: {},
      image_1: {},
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
    $http.get('{home}/api/?', {
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