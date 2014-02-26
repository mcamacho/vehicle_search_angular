/*
 * Copyright 2013 Ivan Pusic
 * Contributors:
 *   Matjaz Lipus
 */
'use strict';

angular.module('ivpusic.cookie', ['ng']).
factory('ipCookie', ['$document',
  function($document) {
    return (function() {
      function cookieFun(key, value, options) {

        var cookies,
          list,
          i,
          cookie,
          pos,
          name,
          hasCookies,
          all,
          expiresFor;

        options = options || {};

        if (value !== undefined) {
          // we are setting value
          value = typeof value === 'object' ? JSON.stringify(value) : String(value);

          if (typeof options.expires === 'number') {
            expiresFor = options.expires;
            options.expires = new Date();
            // Trying to delete a cookie; set a date far in the past
            if (expiresFor === -1) {
              options.expires = new Date('Thu, 01 Jan 1970 00:00:00 GMT');
              // A new 
            } else {
              options.expires.setDate(options.expires.getDate() + expiresFor);
            }
          }
          $document[0].cookie = [
            encodeURIComponent(key),
            '=',
            encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '',
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
          ].join('');
          return $document[0].cookie;
        }

        list = [];
        all = $document[0].cookie;
        if (all) {
          list = all.split('; ');
        }

        cookies = {};
        hasCookies = false;

        for (i = 0; i < list.length; ++i) {
          if (list[i]) {
            cookie = list[i];
            pos = cookie.indexOf('=');
            name = cookie.substring(0, pos);
            value = decodeURIComponent(cookie.substring(pos + 1));

            if (key === undefined || key === name) {
              try {
                cookies[name] = JSON.parse(value);
              } catch (e) {
                cookies[name] = value;
              }
              if (key === name) {
                return cookies[name];
              }
              hasCookies = true;
            }
          }
        }
        if (hasCookies && key === undefined) {
          return cookies;
        }
      }
      cookieFun.remove = function(key, options) {

        var hasCookie = cookieFun(key) !== undefined;
        if (hasCookie) {
          if (!options) {
            options = {};
          }
          options.expires = -1;
          cookieFun(key, '', options);
        }
        return hasCookie;
      };
      return cookieFun;
    }());
  }
]);