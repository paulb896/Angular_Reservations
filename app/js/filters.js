'use strict';

/* Filters */

angular.module('userCalendar.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }])
  .filter('extractDay', ['version', function(dateTime) {
    return function(dateTime) {
      return dateTime;
      var date = new Date(dateTime);
      return String(date.getDate());
    }
  }]);
  
