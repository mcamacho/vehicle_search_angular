'use strict';

angular.module('vehicleSearchAngularApp')
  .factory('sourceFactory', function() {
    var _rangeArray = function (step, qty, min) {
      var range = [];
      while (qty--) {
        range.push(qty * step + min);
      }
      return range.reverse();
    };
    return {
      vehicleKeyV1: {
        year: {
          keyval: 'year',
          menu: {
            order: 5,
            valueLabel: 'Year'
          }
        },
        make: {
          keyval: 'make',
          menu: {
            order: 10,
            valueLabel: 'Make'
          }
        },
        model: {
          keyval: 'model',
          menu: {
            order: 15,
            valueLabel: 'Model'
          }
        },
        // trim: {
        //   keyval: 'trim',
        //   menu: {
        //     order: 16,
        //     valueLabel: 'Trim'
        //   }
        // },
        standardBody: {
          keyval: 'standard_body',
          menu: {
            order: 20,
            valueLabel: 'Body'
          }
        },
        exteriorColor: {
          keyval: 'exterior_color',
          menu: {
            order: 25,
            valueLabel: 'Color'
          }
        },
        transmission: {
          keyval: 'transmission',
          menu: {
            order: 30,
            valueLabel: 'Transmission'
          }
        },
        fuelType: {
          keyval: 'fuel_type',
          menu: {
            order: 35,
            valueLabel: 'Fuel Type'
          }
        },
        price: {
          keyval: 'price',
          slideorder: 5
        },
        mileage: {
          keyval: 'mileage',
          slideorder: 10
        },
        vin: {
          keyval: 'vin'
        },
        image1: {
          keyval: 'image_1'
        },
        extColorCode: {
          keyval: 'ext_color_code'
        },
        evoxId: {
          keyval: 'evox_id'
        }
      },
      rangeArray: _rangeArray
    };
  });
