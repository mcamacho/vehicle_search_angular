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
      }
    };
    $scope.$watch('menu.filterObj', function(argument) {
      $scope.menu.getQuery();
      $scope.menu.updateModel();
    }, true);
    $scope.$watch('base', function() {
      var mainData = $scope.base.mainData;
      if (!_.isEmpty(mainData)) {
        _.assign($scope.menu, {
          listC: mainData,
          listI: mainData,
          categoriesI: collectionFactory(mainData).menucategories(sourceFactory.vehicleKeyV1)
        });
      }
    }, true);
  });