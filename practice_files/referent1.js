// dbServices wrap the providers
// Loader service returns a function
angular.module('dbServices', []).factory('Loader', function dbServicesFactory() {
  // fetchFunction is a function argument
  return function(fetchFunction) {
    var loader = {
      _load: function() {
        var self = this;
        // fetchFunction receives a anonymous function to be trigger as a callback
        // anonymous function receives the response from the get call
        // anonymous function assigns to the factory(loader) function scope the result
        fetchFunction(function(items) {
            self.currentPageItems = items;
          });
      }
    };
    // Load the first page
    loader._load();
    return loader;
  };
});

var app = angular.module('project', ['dbServices']);
app.controller('GenCtrl', ['$scope', '$http', 'Loader',
  function($scope, $http, Loader) {
    // $http config function 
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
      $scope.searchLoader = Loader(fetchFunction);
  }]);