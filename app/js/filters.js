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

      return monthNames[monthNumber];
    }
  }])
  .filter('getChartPosition', [function(dateTime) {
    return function(dateTime) {
      //console.log("Using this datetime to determine chart position: " + dateTime);
      var dateTime = new Date(dateTime);
      //console.log("AND THE HOURS IN TIME ARE: ");
      //console.log(dateTime.getHours());
      //return (dateTime.getHours() * 60) + dateTime.getMinutes();
      return (dateTime.getHours() * 60);
    }
  }])
  .filter('niceTime', [function(time) {
    return function(time) {
      //console.log("Using this datetime to determine chart position: " + dateTime);
      var dateTime = new Date(time);
      //console.log("AND THE HOURS IN TIME ARE: ");
      //console.log(dateTime.getHours());
      return dateTime.toLocaleTimeString();
    }
  }])
  .filter('minuteWidth', [function(width) {
    return function(width) {
        return width * 5;
    }
  }])
  .filter('reservationState', [function(requestedTime) {
      return function(requestedTime) {
          if (!requestedTime.hasOwnProperty("x")) {
              return "hidden";
          }
          //  || $scope.requestedTime.x != null
          //) {
          //    $scope.requestedTime.x = null;
          //    return;
          //}
          return "";
      }
  }])
