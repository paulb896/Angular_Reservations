'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('userCalendar.services', []).
  value('monthNames', [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ])
  .factory('defaultSelectedDate', function(){
    return {
      "company" : "Restaurant Name",
      "address" : "Restaurant Address",
      "selectedDateStatus" : "Current Booking Status",
      "month" : "6",
      "time" : "12:42:11",
      "year" : "2013",
      "status" : "pending",
      "day": 1,
      "duration": "30min"
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
  }).factory('ReservationRequest', function($http) {
    var ReservationRequest = {
        async: function(reservation) {
            console.log('Before reservation request post');
            // $http returns a promise, which has a then function, which also returns a promise

            //$http.jsonp()

            var promise = $http.post("/reserve", reservation).then(function (response) {
                // The then function here is an opportunity to modify the response
                console.log("response from post");
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
    return ReservationRequest;
}).factory('UserModel', function(){
    return {
        "user_name" : "paulb896",
        "user_email" : "paulb896@gmail.com"
    };
});
