'use strict';

angular.module('vehicleSearchAngularApp')
  .controller('menuSelect', function ($scope, $log, _, collectionFactory, sourceFactory, $sce) {
    $scope.menu = {
      // initial values
      test: {},
      active: false,
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
        return $sce.trustAsHtml(html);
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
          return key.replace(/([A-Z])/,'_$1').toLowerCase() + '=' + value;
        }).join('/');
      },
      updateModel: function() {
        function rangeF(value) {
          return value.indexOf(',') > -1;
        }
        var filter = _.omit(this.filterObj, rangeF);
        var range = _.pick(this.filterObj, rangeF);
        this.listI = _.isEmpty(filter) ? this.listC : _.where(this.listC, filter);
        if (!_.isEmpty(range)) {
          this.listI = _.filter(this.listI, function (obj) {
            var filReturn = [];
            for (var ra in range) {
              var rangeArray = range[ra].split(',');
              var objValue = obj[ra].search(/[a-zA-Z]/) > -1 ? -1 : parseInt(obj[ra].replace(',',''), 10);
              filReturn.push(objValue >= parseInt(rangeArray[0], 10) && objValue <= parseInt(rangeArray[1], 10));
            }
            return _.indexOf(filReturn, false) > -1 ? false : true;
          });
        }
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
    $scope.$watch('menu.slider', function (previous, current) {
      if (previous && current) {
        for (var key in previous) {
          if (!_.isEqual(previous[key], current[key])) {
            $scope.menu.filterObj[key] = $scope.menu.slider[key].from + ',' + $scope.menu.slider[key].to;
          }
        }
      }
    }, true);
    $scope.$watch('loc.changed', function () {
      $log.log($scope.loc.changed);
      if ($scope.loc.changed) {
        $scope.menu.active = false;
      }
    }, true);
    // init the accordion model
    $scope.$watch('base.mainData', function() {
      $log.log('watch mainData');
      var mainData = $scope.base.mainData;
      $scope.menu.filterObj = {};
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
          },
          active: true
        });
      }
    }, false);
  });