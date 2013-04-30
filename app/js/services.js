'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('userCalendar.services', []).
  value('version', '0.1')
  .factory('selectedDay', function(){
      return {
          "company" : "The White Spot",
          "address" : "4129 Lougheed Hwy",
          "selectedDateStatus" : "pending",
          "month" : 10,
          "day" : 21,
          "time" : "12:42:11",
          "year" : "2013"
      }
  });

/**
  .reservationService: function(){
    
    return {
      getSelectedReservation: function() {
        return {month:"December", day:21, time = "12:42:11", company = "The White Spot", address = "4129 Lougheed Hwy", selectedDateStatus = "approved";
      }
    }
  }*/
