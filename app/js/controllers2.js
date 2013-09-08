
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

//    $(".place_search").keypress(function(event) {
//        if (event.which == 13) {
//            $scope.searchPlaces(this.value);
//        }
//    });
}])
/**
 * Controller that handles date picker functionality
 */
.controller('datePickerController', ['$scope', 'UserSelection', 'PageState', function($scope, UserSelection, PageState) {
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
    };

    $scope.updateSelectedDay = function(day) {
        var newSelectedDate = new Date();
        newSelectedDate.setFullYear(UserSelection.selectedDate.getFullYear());
        newSelectedDate.setMonth(UserSelection.selectedDate.getMonth());
        newSelectedDate.setDate(day);
        UserSelection.selectedDate = newSelectedDate;
    };

    $scope.initializeDate = function() {
        UserSelection.selectedDate = new Date();
        PageState.currentDate = new Date();
    };
}]);
