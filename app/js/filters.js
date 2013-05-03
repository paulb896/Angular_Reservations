'use strict';

/* Filters */

angular.module('userCalendar.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }])
  .filter('extractDay', [function(dateTime) {
    return function(dateTime) {
      return dateTime;
      var date = new Date(dateTime);
      return String(date.getDate());
    }
  }])
  .filter('monthName', [function(monthNumber) {
    return function(monthNumber) {
      var monthNames = [ "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December" ];

      return monthNames[monthNumber-1];
    }
  }]);
  
