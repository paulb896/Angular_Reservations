'use strict';

/* Controllers */

var initializeScope = function($scope) {
  $scope.company = "The White Spot";
  $scope.address = "4129 Lougheed Hwy";
  $scope.selectedDateStatus = "pending";
  $scope.time = "12:42:11";
  $scope.year = "2013";
}

var getRervations = function(day, month, year) {
    var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
  
    return [
      "On the " + day + " day of " + monthNames[month-1] + " in the year " + year + " : ",
      "On the " + day + " day of " + monthNames[month-1] + " in the year " + year + " : "
    ];
};

angular.module('userCalendar.controllers', []).
  controller('UserCtrl', ['$scope', function($scope) {
    console.log($scope);
    //$scope.user = "Paul";
    //$scope.user = "Paul";
    //user = "Paul";
    $scope.user_name = "paul";
  }])
  /**
   * 
   */
  .controller('CalendarCtrl', ['$scope', function($scope) {

  }])
  .controller('ReservationCtrl', ['$scope', 'selectedDay', function($scope, selectedDay) {
    //console.log($scope);
    
    //var reservation = reservationService.getSelectedReservation();
    // $scope.month = reservation.month;
    
    // replace with style from above
    initializeScope($scope);

    $scope.dateNow = new Date();
    console.log("The following is my selectedDay: ");
    console.log(selectedDay);

    // Extract this function into separate module

    //var days = [{"date":"10/07/13"},{"date":"10/08/13"}, {"date":"10/09/13"}];
    //$scope.days = days;
    $scope.getDays = function(month, year){
      var daysInMonth = new Date(year, month, 0).getDate(),
      firstDayOfWeek = new Date(year, month, 1).getDay(),
      daysObject = new Array();

      for(var i = 1; i <= daysInMonth; i++) {
        daysObject[i] = i;
      }

      // Remove first element because my solution sucks.. REMOVE THIS
      daysObject.splice(0,1);
      console.log("Getting days" + daysInMonth);
      return daysObject;
    };

    $scope.toggleStatus = function(currentStatus){
      var toggleStates = ["declined", "pending", "approved"];

      // This way we don't have to check for the last element or null,
      // because they will have the same outcome (loop back around to first element).
      var nextStatus = toggleStates[0];
      for (var i = 0; i < (toggleStates.length-1); i++) {
        if (toggleStates[i] == currentStatus) {
          nextStatus = toggleStates[++i];
          break;
        }
      }

      $scope.selectedDateStatus = nextStatus;
      return currentStatus;
    }



    $scope.getReservations = getRervations;
  }]);
