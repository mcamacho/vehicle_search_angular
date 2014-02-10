angular.module('dbServices', [])
  .factory('dbVehicleValues', function dbVehValFactory() {
    return function(fetchFunction) {
      var loader = {
        _load: function() {
          var self = this;
          console.log(self,'before items assigned');
          fetchFunction(function(items) {
              self.items = items;
              console.log(self,'after items assigned');
            });
        }
      };
      console.log('before _load call');
      loader._load();
      console.log('after _load call');
      return loader;
    };
  });

var app = angular.module('project', ['dbServices']);
app.controller('GenCtrl', ['$scope', '$http', 'dbVehicleValues', function($scope, $http, dbVehicleValues) {
    var fetchFunction = function(callback) {
      $http.get('{home}/api/?', {
        params: {
          f: 'json',
          show: '100',
          type: 'used',
          k: 'blog_id=id,the_id=vin,year,make,model,trim,standard_body,price,image_1,mileage,transmission,evox_id,ext_color_code'
        }
      })
        .success(callback);
    };
  console.log('1ctrl',$scope.searchLoader, typeof dbVehicleValues);
    $scope.searchLoader = dbVehicleValues(fetchFunction);
  console.log('2ctrl',$scope.searchLoader);
  }]);