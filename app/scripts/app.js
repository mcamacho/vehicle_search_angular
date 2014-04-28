/*global _,jQuery*/
'use strict';
angular.module('vehicleSearchAngularApp', ['ivpusic.cookie', 'geolocation', 'nouislider'])
  .constant('_', _)
  .controller('baseCtrl', function ($scope, $window, $log, $http, ipCookie, geolocation, sourceFactory, dashFactory, collectionFactory, _) {
    // private variables to be used on server query
    var vehType = /^(,?[nN]ew(:[a-zA-Z ]+)?|,?[uU]sed(:[a-zA-Z ]+)?|,?[cC]ertified(:[a-zA-Z ]+)?){1,3}$/.test($window.vehType) ? $window.vehType : 'used:Pre Owned';
    vehType = _.map(vehType.split(','), function(e) {
      return e.indexOf(':')>0 ? e.split(':') : [e, e];
    });
    var cookieParams = {
      path: '/',
      expires: 30
    },
    callParams = {
      api: true,
      f: 'json',
      show: 'all',
      type: vehType[0][0],
      k: dashFactory.queryValues(sourceFactory.vehicleKeyV1, 'keyval').toString()
    };
    // base object on the parent scope contains data for any child
    $scope.vtype = {
      types: vehType,
      selected: vehType[0][0],
      select: function(sel) {
        this.selected = sel;
        callParams.type = sel;
      }
    };
    function serverCall() {
      $http({
        method: 'GET',
        // method: 'POST',
        url: 'testAll.json',
        // url: '{THEME_ROOT}/_ajax.php',
        params: callParams
      })
      .success(function (data) {
        $scope.base.mainData = _.map(data, function (obj) {
          obj.price = /^[0-9,.]+$/.test(obj.price) ? obj.price : '0';
          obj.mileage = /^[0-9,.]+$/.test(obj.mileage) ? obj.mileage : '0';
          return obj;
        });
        $scope.loc.changed = false;
      });
    }
    $scope.$watch('vtype.selected', function (oldv,newv) {
      if (oldv !== undefined && oldv !== newv) {
        $scope.loc.changed = true;
        serverCall();
      }
    });
    $scope.base = {
      mainData: []
    };
    var zipCookie = $window.locDisable ? '00000' : ipCookie('zipcode');
    $scope.loc = {
      zipcode: zipCookie ? zipCookie.toString().length < 5 ? '0' + zipCookie : zipCookie.toString() : '',
      radius: parseInt(ipCookie('radius'), 10) || 50,
      changed: false,
      disRange: sourceFactory.rangeArray(25, 20, 25)
    };
    $scope.cache = {
      zipcode: $scope.loc.zipcode,
      radius: $scope.loc.radius
    };

    function updateCookies() {
      ipCookie('zipcode', $scope.loc.zipcode.toString(), cookieParams);
      ipCookie('radius', $scope.loc.radius.toString(), cookieParams);
    }
    function locChanges(prev, current, scope) {
      if (prev === undefined) {
        return false;
      }
      var key = _.invert(scope.loc)[prev];
      if ($scope.cache[key] !== $scope.loc[key]) {
        $scope.cache[key] = $scope.loc[key];
        $scope.loc.changed = true;
        updateCookies();
        serverCall();
        jQuery(document).trigger('locupdate');
      }
    }

    $scope.$watch('loc.zipcode', locChanges);
    $scope.$watch('loc.radius', locChanges);
    /*$scope.submit = function () {
      $scope.loc.changed = false;
      updateCookies();
      serverCall();
      $window.dispatchEvent($window.zipupdate);
    };*/
    // error listener
    $scope.$on('error', function () {
      $log.error('on error', arguments[0], arguments[1], arguments[2]);
    });
    // update zipcode if undefined or run the app
    if (_.isEmpty($scope.loc.zipcode)) {
      $log.info('expecting zipcode value from geo or user ');
      geolocation.getLocation().then(
        function (data) {
          $log.info('geo ready', data);
          var geo = {
            lat: data.coords.latitude,
            long: data.coords.longitude
          };
          geo.url = 'http://api.geonames.org/findNearbyPostalCodesJSON?lat=' + geo.lat + '&lng=' + geo.long + '&username=macamanga';
          $http.get(geo.url)
            .success(function (data) {
              $scope.loc.zipcode = data.postalCodes[0].postalCode;
            });
        }, function () {
          $log.error('error', arguments);
        });
    } else {
      $log.info('ready to run the zipcode dependent app for ', $scope.loc.zipcode);
      serverCall();
    }

  });
