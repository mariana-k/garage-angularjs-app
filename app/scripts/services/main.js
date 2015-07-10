(function(){

'use strict';

/**
 * @ngdoc function
 * @name garageApp.service:UpdateInput
 * @description: formats input value
 * Service of the garageApp
 */
angular.module('garageApp')
	.service('UpdateInput', function() {
		this.updateInput = function(parkinglevelmodel) {
	    	var parkingLevelInput = document.getElementById("parkinglevel");

	    	if (parkingLevelInput.value.indexOf("Level") === -1) {
				return "Level " + parkinglevelmodel;
			}
		};
});

/**
 * @ngdoc function
 * @name garageApp.service:LoadParkingData
 * @description: loads parking data
 * Service of the garageApp
 */
angular.module('garageApp')
	.service('LoadParkingData', function($http) {
	
	// constructor
    function LoadParkingData(scope) {
        this._scope = scope;

        this._loadParkingData();
    }

    // reference the scope
	LoadParkingData.prototype._loadParkingData = function() {
		var self = this;
		
		// Load all vehicles from external file
        $http.get('data/vehicles.json').success(
			function(data) {
				self._scope.vehiclesList = data;

				// create a parking list
				self._scope.watchVehiclesList();
			}
		);
    };

    return LoadParkingData;
});

/**
 * @ngdoc function
 * @name garageApp.service:RemoveVehicle
 * @description: removes a vehicle form parking list
 * Service of the garageApp
 */
angular.module('garageApp')
	.service('RemoveVehicle', function() {
	
	// constructor
    function RemoveVehicle(scope) {
        this._scope = scope;

        this._removeVehicle();
    }

    // reference the scope
	RemoveVehicle.prototype._removeVehicle = function() {
	
		for (var i = 0; i < this._scope.vehiclesList.length; i++) {

		    if (this._scope.vehiclesList[i].plate === this._scope.plate) {
		    	// remove a vehicle from the parking list
		    	this._scope.vehiclesList.splice(i, 1);

		   		// update the parking list
		    	this._scope.watchVehiclesList();
		    }
		}	
    };

    return RemoveVehicle;
});

/**
 * @ngdoc function
 * @name garageApp.service:AddVehicle
 * @description: adds a vehicle to parking list
 * Service of the garageApp
 */
angular.module('garageApp')
	.service('AddVehicle', function() {
	
	// constructor
    function AddVehicle(scope) {
        this._scope = scope;

        this._addVehicle();
    }

    // reference the scope
	AddVehicle.prototype._addVehicle = function() {
		var existingPlate = [],
			occupiedSlot = [],
			vehiclePlateValue = document.getElementById("vehicleplate").value,
			parkingSlotValue = document.getElementById("parkingslot").value,
			parkingLevelValue = document.getElementById("parkinglevel").value,
			newVehicle = {
	        "plate": this._scope.vehicleplate,
	        "type": this._scope.vehicletype,
	        "level": this._scope.parkinglevel,
	        "slot": this._scope.parkingslot
	    };

		if (vehiclePlateValue && parkingSlotValue && parkingLevelValue) {
			for (var key in this._scope.vehiclesList) {
				// add element to existingPlate array if a vehicle with this plate is already in the parking list
		    	if(this._scope.vehiclesList[key].plate === this._scope.vehicleplate && existingPlate.length === 0) {
		    		existingPlate.push("Plate exists");
				}

				// add element to occupiedSlot array if the slot in this level is not available
				// and alert a warning
				if (this._scope.vehiclesList[key].slot === this._scope.parkingslot && this._scope.vehiclesList[key].level === this._scope.parkinglevel && occupiedSlot.length === 0) {
					occupiedSlot.push("Slot occupied");
					alert("This slot is not available");
				}
			}

			if (existingPlate.length === 0 && occupiedSlot.length === 0) {
				// add a vehicle if both existingPlate and occupiedSlot arrays are empty
				this._scope.vehiclesList.push(newVehicle);

				// update the parking list
				this._scope.watchVehiclesList();
			}
		}
	};

    return AddVehicle;
});
})();
 