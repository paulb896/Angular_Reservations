'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('userCalendar.services', []).
  value('monthNames', [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ])
  .factory('defaultSelectedDate', function($http){
    return {
      "company" : "Restaurant Name",
      "address" : "Restaurant Address",
      "selectedDateStatus" : "Current Booking Status",
      "month" : "10",
      "time" : "12:42:11",
      "year" : "2013",
      "status" : "pending"
    };
  }).factory('myService', function($http) {
    var myService = {
      async: function(day, month, year) {
        console.log(day);
        console.log(month);
        console.log(year);

        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http.get("/mock_data?day="+day+"&month="+month+"&year="+year).then(function (response) {
          // The then function here is an opportunity to modify the response
          console.log(response);
          // The return value gets picked up by the then in the controller.
          if (response.status == 200) {
            return response.data;
          }

          return [];
        });

        // Return the promise to the controller
        return promise;
      }
    };
    return myService;
  });  
  
  
  
  
/**
 * 

app.factory('myService', function($http) {
  var myService = {
    async: function() {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get('test.json').then(function (response) {
        // The then function here is an opportunity to modify the response
        console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return myService;
});

app.controller('MainCtrl', function( myService,$scope) {
  // Call the async method and then do stuff with what is returned inside our own then function
  myService.async().then(function(d) {
    $scope.data = d;
  });
});

**/

/**
  .reservationService: function(){
    
    return {
      getSelectedReservation: function() {
        return {month:"December", day:21, time = "12:42:11", company = "The White Spot", address = "4129 Lougheed Hwy", selectedDateStatus = "approved";
      }
    }
  }*/
