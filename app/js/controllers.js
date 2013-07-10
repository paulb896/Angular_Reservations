'use strict';

/* Controllers */

var getReservations = function(day, month, year) {
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


  .controller('PlaceSearchCtrl', 'defaultSelectedDate' ['$scope', function($scope, defaultSelectedDate) {

  }])


  /**
   * 
   */
  .controller('CalendarCtrl', ['$scope', function($scope) {

  }])

  .controller('ReservationCtrl', ['$scope', 'defaultSelectedDate', 'myService', 'monthNames', 'ReservationRequest', 'UserModel', 'ReservationModel',
    function($scope, defaultSelectedDate, myService, monthNames, ReservationRequest, UserModel, ReservationModel) {

    var dateNow = new Date();
    $scope.dateNow = dateNow;

    console.log("The following is my selectedDay: ");
    defaultSelectedDate.month = dateNow.getMonth();
    defaultSelectedDate.day = dateNow.getDate();
    $scope.monthNames = monthNames;
    $scope.selectedDate = defaultSelectedDate;


    $scope.ReservationModel = ReservationModel;

    $scope.setReservationModel = function(date) {
        ReservationModel.date = date;
        ReservationModel.month = date.getMonth();
        ReservationModel.day = date.getDate();
        ReservationModel.year = date.getFullYear();
    }

    $scope.setReservationModel(dateNow);

    $scope.updateSelected = function(day, month, year) {
      console.log("AND NOW I WILL ATTEMPT TO UPDATE THE SELECTED DATE");
      defaultSelectedDate.day = day;
      myService.async(day, month, year).then(function(d) {
        // Send view an array of reservations for the current state
        $scope.selectedDate.reservations = d;
      });
    }
    $scope.updateSelected(defaultSelectedDate.day, defaultSelectedDate.month, defaultSelectedDate.year);

    $scope.getMonths = function() {
      return monthNames;
    }

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


    $scope.toggleStatus = function(selectedDate, key, currentStatus){
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

      selectedDate.reservations[key].status = nextStatus;

      return currentStatus;
    }

    $scope.helpers = {};
    $scope.helpers.timeIndicators = [];
    $scope.helpers.timeIndicators.push(
        new Date(2013,6,6,3,0),
        new Date(2013,6,6,6,0),
        new Date(2013,6,6,9,0),
        new Date(2013,6,6,12,0),
        new Date(2013,6,6,15,0),
        new Date(2013,6,6,18,0),
        new Date(2013,6,6,21,0),
        new Date(2013,6,6,23,59)
    );


    $scope.requestedTime = {};
    $scope.addOnClick = function(event) {

      event.x = event.clientX;
      //event.x = (dateTime.getHours() * 60) + dateTime.getMinutes();
      var requestedTime = (Math.floor(event.x / 60)-1) + " : " + (event.x % 60);


      var timeSelected = new Date(defaultSelectedDate.year,
          defaultSelectedDate.month,
          defaultSelectedDate.day,
          (Math.floor(event.x / 60)-1), (event.x % 60), 0, 0);

          $scope.requestedTime.x = event.x;
          $scope.requestedTime.date = timeSelected;

          $scope.setReservationModel(timeSelected);
          console.log(ReservationModel);

          $scope.requestedTime.duration_minutes = defaultSelectedDate.duration;

          $scope.requestedTime.localized = timeSelected.toLocaleTimeString();
          $scope.requestedTime.nice = timeSelected.toString("hh:mm tt");
          $scope.requestedTime.day = defaultSelectedDate.day;
        $scope.requestedTime.month = defaultSelectedDate.month;
        $scope.requestedTime.year = defaultSelectedDate.year;
          console.log("starting with" + event.x);
          console.log(event);

    };


    $scope.requestedTime.reserve = function(){
      console.log("Attempting to request time: ");
      ReservationRequest.async(ReservationModel).then(function(responseMessage) {
        // Set success/failure message

          console.log("Reservation request complete, with response: ");
          console.log(responseMessage);
          $scope.updateSelected(ReservationModel.day, ReservationModel.month, ReservationModel.year);
      });
    }

    $scope.getReservations = getReservations;


    $scope.getColor = function(defaultColor, day){
        if (day == $scope.selectedDate.day) {
            return "0000a0";
        }

        return defaultColor;
    };


    $scope.updateRequestToIndicator = function(date) {
        $scope.setReservationModel(date);
    };

    return $scope.ReservationCtrl = this;
  }]);
