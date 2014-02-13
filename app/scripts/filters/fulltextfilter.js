'use strict';

angular.module('vehicleSearchAngularApp')
  .filter('fulltextFilter', ['$filter', function($filter) {
    return function(items, text) {
      if (!text || text.length === 0) {
        return items;
      }
      // split search text on space
      var searchTerms = text.split(' ');

      // search for single terms.
      // this reduces the item list step by step
      searchTerms.forEach(function(term) {
        if (term && term.length) {
          items = $filter('filter')(items, term);
        }
      });

      return items;
    };
  }]);