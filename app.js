(function() {
	// API usage
	// need to create Google objects separate from library to enforce loose coupling
	window.onload = function onload() {
		// First, create Geocoder objects to be passed in, assuming library is available
		// Pass in hard-coded coordinates by creating a Latlng Google object
		var geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.Latlng(45.24645, -110.24346);

		// Initialize the library
		/**
		 * Initializing the library makes the API call and populates an internal object used by the library. The 
		 * library API calls then reference the cached object to save on making further AJAX calls. If a situation 
		 * occurs where the Google API needs to be called again, simply call Guier's relocate() method to perform 
		 * the location check again.
		 */
		Guier.init({
			geocoder: geocoder,
			coordinates: latlng
		});

		// Hey, I need to make another non-initalize method call
		//Guier.relocate();
		
		/**
		 * Usage with the HTML5 Geolocation API
		 * This sample method can be called as the HTML geolocation API callback. All of the additional Guier logic
		 * should exist within here.
		 */
		// TODO(mgerton): If a return value is specified, can the logic be handled in the if()? Should it?
		var initializeGuier = function initializeGuier(position) {
			// need to create Latlng object here; hard to decouple Geolocation API and Google API
			var latlng = new google.maps.Latlng(position.coords.latitude, position.coords.longitude);
			Guier.init({
				geocoder: geocoder,
				coordinates: latlng
			});
		};
		
		// In your document.ready or window.onload, run this check
		var geolocation = navigator.geolocation ? navigator.geolocation : false;
		if (!!geolocation) {
			geolocation.getCurrentPosition(initializeGuier);
		}
		
		
		// Library methods
		// TODO(mgerton): implement these	
		
		// get full address
		//Guier.getFullAddress();

		// get the country
		//Guier.getCountry();

		// get the state/province
		//Guier.getState();
		//Guier.getProvince();
		
		// get the city
		//Guier.getCity();
		
		// get the ZIP code
		//Guier.getZipCode();
		
		// get postal address
		//Guier.getPostalAddress();

		// v2 API?
		// Advantages: generic locate() method could abstract get() methods into privates
		// support for callbacks
		//Guier.locate('country');
		//Guier.locate('state', function() {
			// callback stuff
		//});
	};	
}());
