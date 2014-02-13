'use strict';

angular.module('vehicleSearchAngularApp')
  .factory('sourceFactory', function() {
    return {
      vehicleKeyV1: {
        year: {
          keyval: 'year',
          menuorder: 5
        },
        make: {
          keyval: 'make',
          menuorder: 10
        },
        model: {
          keyval: 'model',
          menuorder: 15
        },
        trim: {
          keyval: 'trim',
          menuorder: 16
        },
        standardBody: {
          keyval: 'standard_body',
          menuorder: 20,
          viewas: 'body'
        },
        exteriorColor: {
          keyval: 'exterior_color',
          menuorder: 25,
          viewas: 'color'
        },
        transmission: {
          keyval: 'transmission',
          menuorder: 30
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
      }
    };
  });
