angular.module('dbServices', [])
  .factory('dbVehicleValues', ['$http', function dbVehValFactory($http) {
    var API_PATH = '{home}/api/?',
      paramsV1 = {
        f: 'json',
        show: '100',
        type: 'used',
        k: 'blog_id=id,the_id=vin,year,make,model,trim,standard_body,price,image_1,mileage,transmission,evox_id,ext_color_code'
      };
    function returnCollection(scope, property) {
      $http.get(API_PATH, { params: paramsV1 }).success(function(data) {
        scope[property] = data;
      });
    }
    return {
      returnCollection: returnCollection
    };
  }]);

var app = angular.module('project', ['dbServices']);
app.controller('GenCtrl', ['$scope', 'dbVehicleValues', function($scope, dbVehicleValues) {
  dbVehicleValues.returnCollection($scope, 'searchLoader');
  $scope.customq = { year: '2013', make: 'toyota', model: 'corolla' };
}]);