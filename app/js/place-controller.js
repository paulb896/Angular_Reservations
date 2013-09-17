
;'use strict';

/**
 * All controllers used for reservation tracking
 */

angular.module('reserveTheTime.place.controller', [])

.controller('placeController', ['$scope', 'UserSelection', 'PageState', 'placeService', function($scope, UserSelection, PageState, placeService) {
    $scope.UserSelection = UserSelection;
    $scope.PageState = PageState;

    $scope.ratings = [1,2,3,4,5];

    $scope.getPlaceDetails = function() {
        if (UserSelection.place
            && UserSelection.place.hasOwnProperty('reference')
        ) {
            placeService.details(UserSelection.place.reference).then(function(details) {
                UserSelection.place = details.result;
                var mapOptions = {
                    zoom: 15,
                    center: new google.maps.LatLng(details.result.geometry.location.lat, details.result.geometry.location.lng),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById('map-canvas'),
                    mapOptions);
            });
        }
    };
}])