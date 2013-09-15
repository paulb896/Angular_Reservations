
;'use strict';

/**
 * All controllers used for reservation tracking
 */

angular.module('reserveTheTime.place.controller', [])

.controller('placeController', ['$scope', 'UserSelection', 'PageState', function($scope, UserSelection, PageState) {
    $scope.UserSelection = UserSelection;
    $scope.PageState = PageState;
}])