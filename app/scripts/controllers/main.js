(function(){

'use strict';

/**
 * @ngdoc function
 * @name garageApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the garageApp
 */
angular.module('garageApp')
	.controller('MainCtrl', function ($scope, $http, UpdateInput, LoadParkingData, RemoveVehicle, AddVehicle) {
    	var self = this;

    	// initial setup
	    $scope.vehiclesList = [];
	    $scope.filteredVehicles = [];
  		$scope.currentPage = 1;
  		$scope.numPerPage = 10;
  		
  		$scope.LoadParkingData = new LoadParkingData($scope);

		// *********************************
	    // Internal methods
	    // *********************************

	    /**
	     * create or update parking list if there are any changes
	     */
	    $scope.watchVehiclesList = function() {
	    	return $scope.$watch('currentPage + numPerPage', function() {
			    var begin = (($scope.currentPage - 1) * $scope.numPerPage), 
			    	end = begin + $scope.numPerPage;
			    
			    $scope.filteredVehicles = $scope.vehiclesList.slice(begin, end);
			});
	    };

	    /**
	     * prepend string "Level " to parking level input model
	     */
	    $scope.updateInputValue = function() {
	    	self.parkinglevel = UpdateInput.updateInput(self.parkinglevel);
	    };
	    
		
		/**
	     * add a new vehicle to parking list or alert a warning if the parking slot is not available
	     */
		$scope.addVehicle = function() {
			$scope.vehicleplate = self.vehicleplate;
		    $scope.vehicletype = self.vehicletype;
		    $scope.parkinglevel = self.parkinglevel;
		    $scope.parkingslot = self.parkingslot;
	    	$scope.AddVehicle = new AddVehicle($scope);
	    };

	    /**
	     * remove a vehicle from  parking list
	     */
	    $scope.removeVehicle = function() {
	    	$scope.plate = self.plate;
	    	$scope.RemoveVehicle = new RemoveVehicle($scope);
	    };
});

})();