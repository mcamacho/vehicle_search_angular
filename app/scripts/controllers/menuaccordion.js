'use strict';

angular.module('vehicleSearchAngularApp')
  .controller('menuAccordion', function ($scope, _, collectionFactory, sourceFactory) {
    $scope.menu = {
      // initial values
      listI: [],
      categoriesI: {},
      filterObj: {},
      // queryArray: [],
      query: '',
      // UI methods
      resultsQty: function() {
        return this.listI ? this.listI.length : '0';
      },
      filterList: function(valueKey, key) {
        this.filterObj[valueKey] = key;
      },
      uniq: function(index) {
        var cat = this.categoriesI[index],
          options = _.keys(cat.options),
          html = '';
        if (options.length === 1) {
          html = '<span>' + options[0] + '</span>';
          if (_.has(this.filterObj, cat.valueKey)) {
            html = html + '<span class="remove"> disable</span>';
          }
        }
        return html;
      },
      toggle: function(index) {
        var valueKey = this.categoriesI[index].valueKey;
        if (_.has(this.filterObj, valueKey)) {
          this.filterObj = _.omit(this.filterObj, valueKey);
        }
      },
      // internal methods
      getQuery: function() {
        // this.query = this.queryArray.join('/');
        this.query = _.map(this.filterObj, function(value, key) {
          return key + '=' + value;
        }).join('/');
      },
      updateModel: function() {
        this.listI = _.isEmpty(this.filterObj) ? this.listC : _.where(this.listC, this.filterObj);
        this.categoriesI = collectionFactory(this.listI).menucategories(sourceFactory.vehicleKeyV1);
      },
      getSlider: function(key) {
        var valArray = _.pluck(this.listI, key);
        var cleanArray = [];
        for (var i = valArray.length - 1; i >= 0; i--) {
          if (valArray[i].search(/[a-zA-Z]/) < 0) {
            cleanArray.push(parseInt(valArray[i].replace(',', ''), 10));
          }
        }
        var min = Math.floor(_.min(cleanArray) / 1000) * 1000;
        var max = Math.ceil(_.max(cleanArray) / 1000) * 1000;
        return {
          from: min,
          to: max,
          step: 1000,
          min: min,
          max: max
        };
      }
    };
    // listen for filter changes
    $scope.$watch('menu.filterObj', function() {
      $scope.menu.getQuery();
      $scope.menu.updateModel();
    }, true);
    // listen for slider changes
    $scope.$watch('menu.slider', function () {
      console.log($scope.menu.slider);
    })
    // init the accordion model
    $scope.$watch('base', function() {
      var mainData = $scope.base.mainData;
      if (!_.isEmpty(mainData)) {
        _.assign($scope.menu, {
          listC: mainData,
          listI: mainData,
          categoriesI: collectionFactory(mainData).menucategories(sourceFactory.vehicleKeyV1)
        });
        _.assign($scope.menu, {
          slider: {
            price: $scope.menu.getSlider('price'),
            mileage: $scope.menu.getSlider('mileage')
          }
        });
      }
    }, true);
  });