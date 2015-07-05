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
	.controller('MainCtrl', function ($scope, $http) {
    	var self = this;

	    $scope.vehiclesList = [];
	    $scope.filteredVehicles = [];
  		$scope.currentPage = 1;
  		$scope.numPerPage = 10;

	    // Load all vehicles from external file
	    $http.get('data/vehicles.json').success(
			function(data) {
				$scope.vehiclesList = data;

				// create a parking list
				$scope.watchVehiclesList();
			}
		);

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
	    }

	    /**
	     * prepend string "Level " to parking level input model
	     */
	    $scope.updateInput = function() {
	    	var parkingLevel = document.getElementById("parkinglevel");

	    	if (parkingLevel.value.indexOf("Level") === -1) {
				self.parkinglevel = "Level " + self.parkinglevel;
			}
	    }
		
		/**
	     * add a new vehicle to parking list or alert a warning if the parking slot is not available
	     */
		$scope.addVehicle = function() {
			var existingPlate = [],
				occupiedSlot = [],
				vehiclePlateValue = document.getElementById("vehicleplate").value,
				parkingSlotValue = document.getElementById("parkingslot").value,
				parkingLevelValue = document.getElementById("parkinglevel").value,
				newVehicle = {
		        "plate": self.vehicleplate,
		        "type": self.vehicletype,
		        "level": self.parkinglevel,
		        "slot": self.parkingslot
		    };

			if (vehiclePlateValue && parkingSlotValue && parkingLevelValue) {
				for (var key in $scope.vehiclesList) {
					// add element to existingPlate array if a vehicle with this plate is already in the parking list
			    	if($scope.vehiclesList[key].plate === self.vehicleplate && existingPlate.length === 0) {
			    		existingPlate.push("Plate exists");
					}

					// add element to occupiedSlot array if the slot in this level is not available
					// and alert a warning
					if ($scope.vehiclesList[key].slot === self.parkingslot 
						&& $scope.vehiclesList[key].level === self.parkinglevel 
						&& occupiedSlot.length === 0) {
						occupiedSlot.push("Slot occupied");
						alert("This slot is not available");
					}
				}

				if (existingPlate.length === 0 && occupiedSlot.length === 0) {
					// add a vehicle if both existingPlate and occupiedSlot arrays are empty
					$scope.vehiclesList.push(newVehicle);

					// update the parking list
					$scope.watchVehiclesList();
				}
			}
	    }

	    /**
	     * remove a vehicle from  parking list
	     */
	    $scope.removeVehicle = function() {
		    for (var i = 0; i < $scope.vehiclesList.length; i++) {
			    if ($scope.vehiclesList[i].plate === self.plate) {
			    	// remove a vehicle from the parking list
			    	$scope.vehiclesList.splice(i, 1);

			   		// update the parking list
			    	$scope.watchVehiclesList();
			    }
			}
	    }
	});
})();
