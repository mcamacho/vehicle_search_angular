'use strict';

angular.module('vehicleSearchAngularApp')
  .controller('searchViewCtrl', function ($scope, $http, sourceFactory, collectionFactory, dashFactory) {
    var vehicleKeys = dashFactory.queryValues(sourceFactory.vehicleKeyV1, 'keyval');
    var callParams = {
      f: 'json',
      show: '100',
      type: 'used',
      k: vehicleKeys.toString()
    };
    var fetchFunction = function(callback) {
      // dashFactory.dlocation.protocol() + '://' + dashFactory.dlocation.host() + '/api/?'
      $http.get('test.json', { params: callParams })
        .success(callback);
    };
    var vehicleQuery = {
      fetchFunction: fetchFunction,
      vehicleKeys: dashFactory.keys(sourceFactory.vehicleKeyV1)
    };
    $scope.searchLoader = collectionFactory(vehicleQuery);
  });
