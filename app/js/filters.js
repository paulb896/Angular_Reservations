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
  }])
  .filter('getChartPosition', [function(dateTime) {
    return function(dateTime) {
      //console.log("Using this datetime to determine chart position: " + dateTime);
      var dateTime = new Date(dateTime);
      //console.log("AND THE HOURS IN TIME ARE: ");
      //console.log(dateTime.getHours());
      return (dateTime.getHours() * 60) + dateTime.getMinutes();
    }
  }])
  
