;'use strict';

/**
 * All services used for reservation tracking
 */
angular.module('reserveTheTime.services', [])
.factory('UserSelection', function(){
    return {
        "selectedDate": "",
        "place": {},
        "attendee":"",
        "city":""
    };
})
.factory('PageState', function(){
    return {
        "cities":[{name:"Calgary"}, {name:"Burnaby"}],
        "currentDate": "",
        "places":[],
        "reservations":[],
        "hours":[],
        "attendees":[],
        "days" : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        "chartHours": [13,14,15,16,17],
        "months": [{name:"January"}, {name:"February"}, {name:"March"}, {name:"April"}, {name:"May"}, {name:"June"}, {name:"July"}, {name:"August"}, {name:"September"}, {name:"October"}, {name:"November"}, {name: "December"}]
    };
})
.factory('placeService', function($http) {
    var placeService = {
        find: function(category, searchText) {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get("/places?category="+category+"&searchText="+searchText).then(function (response) {
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
    return placeService;
})
.factory('reservationSearch', function($http) {
    var service = {
        find: function(year, month, day) {
            console.log(day);
            console.log(month);
            console.log(year);

            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get("/reservations?day="+day+"&month="+month+"&year="+year).then(function (response) {
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
    return service;
}).factory('Reservation', function($http) {
    var Reservation = {
        request: function(reservation) {
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
    return Reservation;
})