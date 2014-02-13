'use strict';

angular.module('vehicleSearchAngularApp')
  .controller('searchCategoryCtrl', function ($scope, sourceFactory, dashFactory) {
    var vehicleKeys = dashFactory.queryValues(sourceFactory.vehicleKeyV1, 'keyval');

    $scope.$watch('searchLoader.items', function(){
      var collection = [];
      angular.forEach($scope.searchLoader.items, function(ele) {
        // console.log('make', ele.make);
        collection.push({ make: ele.make });
      });
      console.log(collection);
      $scope.collection = collection;
    });
    console.log('collection-', $scope.collection);
  });