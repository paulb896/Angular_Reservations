
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
 * Controller that handles place search requests
 */
.controller('placeSearchController', ['$scope', 'UserSelection', 'PageState', 'placeService', function($scope, UserSelection, PageState, placeService) {
    $scope.UserSelection = UserSelection;
    $scope.PageState = PageState;

    $scope.searchPlaces = function(searchText) {
        console.log("SEARCH REQUEST, search text", searchText);
        placeService.find("food", searchText).then(function(d) {
            // Send view an array of reservations for the current state
            //$scope.selectedDate.reservations = d;
            console.log("Data from place search: ", d);
            PageState.places = d.results;
        });
    };



    $scope.updatePlace = function(place) {
        UserSelection.place = place;
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
        var newSelectedDate = new Date(UserSelection.selectedDate.getFullYear(), monthNumber, 0);
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
        UserSelection.selectedDate = newSelectedDate;
        $scope.updateReservations();
    };

    $scope.initializeDate = function() {
        UserSelection.selectedDate = new Date();
        PageState.currentDate = new Date();
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
            year:UserSelection.selectedDate.getFullYear()
        };

        Reservation.request(reservation).then(function(responseMessage) {
            // Set success/failure message

            console.log("Reservation request complete, with response: ");
            console.log(responseMessage);
        });
    }
}]);