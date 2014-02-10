angular.module('dbServices', [])
  .factory('dbVehicleValues', ['$http', function dbVehValFactory($http) {
    var API_PATH = '{home}/api/?',
      paramsV1 = {
        f: 'json',
        show: '100',
        type: 'used',
        k: 'blog_id=id,the_id=vin,year,make,model,trim,standard_body,price,image_1,mileage,transmission,evox_id,ext_color_code'
      };
    return {
      refresh: refresh
    };
    function refresh() {
      return $http.get(API_PATH, { params: paramsV1 });
    }
  }]);

var app = angular.module('project', ['dbServices']);
app.controller('GenCtrl', ['$scope', 'dbVehicleValues', function($scope, dbVehicleValues) {
  dbVehicleValues.refresh().success(function(data) {
    $scope.searchLoader = data;
  });
}]);