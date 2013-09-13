
;'use strict';

/**
 * All controllers used for reservation tracking
 */

angular.module('reserveTheTime.controllers', [])
/**
 * Controller that handles data preparation for display in page banners
 */
.controller('bannerController', ['$scope', 'UserSelection', 'PageState', function($scope, UserSelection, PageState) {
    $scope.UserSelection = UserSelection;
    $scope.PageState = PageState;
}])
/**
 * Controller that handles data preparation for display in page banners
 */
.controller('tileNavigationController', ['$scope', 'UserSelection', 'PageState', function($scope, UserSelection, PageState) {
    $scope.UserSelection = UserSelection;
    $scope.PageState = PageState;

    $scope.updateNav = function(template){
        $scope.template = template;
    };

    // Bind templates specific to this controllers scope
    $scope.templates =
      [ { name: "Calendar", url: 'partials/tile-hour-chart.html', imageUrl:"img/calendar.png"}
      , { name: 'Attendees', url: 'partials/tile-attendees.html', imageUrl:"img/add-user-icon.png"}
      , { name: 'Reserve', url: 'partials/tile-reservation.html', imageUrl:"img/gear.png"}
      , { name: 'Place Search', url: 'partials/tile-place-search.html', imageUrl:"img/find2.png"}
      , { name: 'Hourly Chart', url: 'partials/tile-date-picker.html', imageUrl:"img/clock.png"}
      ];

    $scope.initializeNav = function() {
        $scope.template = $scope.templates[0];
    };

}])
/**
 * Controller that handles place search requests
 */
.controller('placeSearchController', ['$scope', 'UserSelection', 'PageState', 'placeService', function($scope, UserSelection, PageState, placeService) {
    $scope.UserSelection = UserSelection;
    $scope.PageState = PageState;

    $scope.searchPlaces = function(searchText) {
        console.log("SEARCH REQUEST, search text", searchText);
        placeService.find(UserSelection.placeType, searchText).then(function(d) {
            // Send view an array of reservations for the current state
            //$scope.selectedDate.reservations = d;
            console.log("Data from place search: ", d);
            PageState.places = d.results;
        });
    };

    $scope.updateCity = function(city) {
        UserSelection.city = city;
    };

    $scope.updatePlace = function(place) {
        UserSelection.place = place;
    };

    $scope.updatePlaceType = function(placeType) {
        UserSelection.placeType = placeType;
    };
//    $(".place_search").keypress(function(event) {
//        if (event.which == 13) {
//            $scope.searchPlaces(this.value);
//        }
//    });
}])
/**
 * Controller that handles date picker functionality
 */
.controller('datePickerController', ['$scope', 'UserSelection', 'PageState', 'reservationSearch', function($scope, UserSelection, PageState, reservationSearch) {
    $scope.PageState = PageState;
    $scope.UserSelection = UserSelection;
    $scope.setMonth = function(monthNumber) {
        var newSelectedDate = new Date(UserSelection.selectedDate.getFullYear(), monthNumber, 0, UserSelection.selectedDate.getMinutes());
        PageState.days = new Array();
        for(var i = 1; i <= newSelectedDate.getDate(); i++) {
            PageState.days.push(i);
        }
        newSelectedDate.setDate(UserSelection.selectedDate.getDate());
        UserSelection.selectedDate = newSelectedDate;
        $scope.updateReservations();
    };

    $scope.updateSelectedDay = function(day) {
        var newSelectedDate = new Date(UserSelection.selectedDate.getFullYear(), UserSelection.selectedDate.getMonth(), day);
        newSelectedDate.setMinutes(UserSelection.selectedDate.getMinutes());
        UserSelection.selectedDate = newSelectedDate;
        $scope.updateReservations();
    };

    $scope.updateChartHours = function(dateTime) {
      PageState.chartHours = [];
      var currentHour = dateTime.getHours(),
      endHour = currentHour + 3,
      startHour = currentHour - 2;

      // Set lowest shown hour
      if (startHour < 1) {
          startHour = 1;
          endHour = 6;
      }

      // Set highest show hour
      if (endHour > 23) {
          endHour = 23;
          startHour = endHour - 5;
      }

      for(var i = startHour; i < endHour; i++) {
        PageState.chartHours.push(i)
      }
    };

    $scope.updateSelectedTime = function(dateTime) {
        $scope.updateChartHours(dateTime);
        var newSelectedDate = new Date(UserSelection.selectedDate.getFullYear(), UserSelection.selectedDate.getMonth(), UserSelection.selectedDate.getDate(), dateTime.getHours()+1);
        UserSelection.selectedDate = newSelectedDate;
    };

    $scope.setTimes = function() {
        PageState.times = new Array();
        for(var i = 0; i <= 23; i++) {
            var timeIndicator = new Date();
            timeIndicator.setHours(i);
            PageState.times.push(timeIndicator);
        }
    };

    $scope.initializeDate = function() {
        PageState.currentDate = new Date();

        if (!UserSelection.selectedDate) {
            UserSelection.selectedDate = new Date();
            $scope.setMonth(PageState.currentDate.getMonth());
        }
        $scope.setTimes();
    };

    $scope.updateReservations = function(){
        reservationSearch.find(UserSelection.selectedDate.getFullYear(), UserSelection.selectedDate.getMonth(), UserSelection.selectedDate.getDate()).then(function(d) {
            // Send view an array of reservations for the current state
            PageState.reservations = d;
        });
    };
}])
/**
 * Controller that handles hour chart functionality
 */
.controller('hourChartController', ['$scope', 'UserSelection', 'PageState', 'reservationSearch', function($scope, UserSelection, PageState, reservationSearch) {
    $scope.PageState = PageState;
    $scope.UserSelection = UserSelection;

    $scope.initializeHours = function() {

    };

    $scope.updateReservations = function(){
        reservationSearch.find(UserSelection.selectedDate.getYear(), UserSelection.selectedDate.getMonth(), UserSelection.selectedDate.getDate()).then(function(d) {
            // Send view an array of reservations for the current state
            PageState.reservations = d;
        });
    };

    $scope.addAttendee = function(attendee) {
        PageState.attendees.push(attendee);
    };

    $scope.selectReservation = function(reservation) {
      console.log("RESERVATION HERE IS: ", reservation);
      if (reservation.hasOwnProperty('date')) {
          UserSelection.selectedDate = new Date(reservation.date);
      }
    };
}])
/**
 * Controller that handles hour chart functionality
 */
.controller('reservationController', ['$scope', 'UserSelection', 'PageState', 'reservationSearch', 'Reservation', function($scope, UserSelection, PageState, reservationSearch, Reservation) {
    $scope.PageState = PageState;
    $scope.UserSelection = UserSelection;

    $scope.reserve = function(){
        console.log("Attempting to request time: ");
        var reservation = {
            date:UserSelection.selectedDate,
            status:"pending",
            duration: UserSelection.duration,
            place:UserSelection.place,
            day:UserSelection.selectedDate.getDate(),
            month:UserSelection.selectedDate.getMonth(),
            year:UserSelection.selectedDate.getFullYear(),
            attendees:PageState.attendees
        };

        Reservation.request(reservation).then(function(responseMessage) {
            // Set success/failure message

            console.log("Reservation request complete, with response: ");
            console.log(responseMessage);
        });
    }
}])
/**
 * Controller that handles hour chart functionality
 */
.controller('attendeeController', ['$scope', 'UserSelection', 'PageState', 'reservationSearch', 'Reservation', function($scope, UserSelection, PageState, reservationSearch, Reservation) {
    $scope.PageState = PageState;
    $scope.UserSelection = UserSelection;

    $scope.addAttendee = function(attendee) {
        PageState.attendees.push(attendee);
    };
}]);