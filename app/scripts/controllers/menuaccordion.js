'use strict';

angular.module('vehicleSearchAngularApp')
  .controller('menuAccordion', function ($scope, $log, _, collectionFactory, sourceFactory, $sce) {
    $scope.menu = {
      // UI methods --------------------------
      // toggle menu.current among index:open and -1:closed
      setCurrent: function(index) {
        this.current = this.current === index ? -1 : index;
      },
      // returns list collection amount
      resultsQty: function() {
        return this.listI ? this.listI.length : '0';
      },
      // updates filterObj with a new key value pair
      filterList: function(valueKey, key) {
        this.filterObj[valueKey] = key;
      },
      //updates category header if only one option is available
      uniq: function(index) {
        var cat = this.categoriesI[index],
          options = _.keys(cat.options),
          html = '';
        if (options.length === 1) {
          html = '<span>' + options[0] + '</span>';
          if (_.has(this.filterObj, cat.valueKey)) {
            html = html + '<span> <i class="foundicon-remove"></i> </span>';
          }
        }
        return $sce.trustAsHtml(html);
      },
      // removes filter option from filterObj
      removeOption: function(index) {
        this.filterObj = _.omit(this.filterObj, this.categoriesI[index].valueKey);
      },
      // internal methods --------------------------
      // constructs GET query string
      getQuery: function() {
        this.query = _.map(this.filterObj, function(value, key) {
          return key.replace(/([A-Z])/g,'_$1').toLowerCase() + '=' + value;
        }).join('/');
      },
      // recreates categoriesI based on filterObj
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
      // returns object config to init slider input
      getSlider: function(key) {
        var valArray = _.pluck(this.listI, key);
        var cleanArray = [];
        for (var i = valArray.length - 1; i >= 0; i--) {
          cleanArray.push(parseInt(valArray[i].replace(',', ''), 10));
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
    // listen for filter changes ---------------------
    $scope.$watch('menu.filterObj', function() {
      // clean current property, used in accordion display
      $scope.menu.current = -1;
      // calls the method to recreate the query string for the results button
      $scope.menu.getQuery();
      // calls the method to recreate the categoriesI model
      $scope.menu.updateModel();
    }, true);
    // listen for slider changes ---------------------
    $scope.$watch('menu.slider', function (previous, current) {
      if (previous && current) {
        for (var key in previous) {
          if (!_.isEqual(previous[key], current[key])) {
            $scope.menu.filterObj[key] = $scope.menu.slider[key].from + ',' + $scope.menu.slider[key].to;
          }
        }
      }
    }, true);
    // listen for location module changes, to toggle active, who is used to reinitiate sliders
    $scope.$watch('loc.changed', function () {
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
