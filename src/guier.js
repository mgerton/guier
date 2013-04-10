/**
 * Guier - A simple wrapper library for Google's Geocoder API
 * @author Matt Gerton <matt.gerton@gmail.com>
 * @version 0.1
 */
;(function(window, undefined) {
	var Guier = window.Guier || {};
	window.Guier = Guier;

	Guier = (function() {
		// Private methods and properties
		var VERSION = '0.1.0';
		var _geocoder;
		var _coordsObj;
		
		/**
		 * Makes the API call to the Geocoder service
		 * 
		 * @return {Object} gp
		 * 			The Geoposition object
		 */
		function geocode() {
			// TODO(mgerton): extract this callback into a private method?
			_geocoder.geocode({'latlng': _coordsObj }, parseGeocodeObject);
		}
		
		/**
		 * Callback function used when Google geocode() method is called. This 
		 * method parses the returned Geocoder object and sets it to an internal 
		 * object that is used to return data via the public API methods.
		 * 
		 * @param {Object} results
		 * 			An object with the resulting geocode data
		 * @param {String} status
		 * 			A status code
		 */
		function parseGeocodeObject(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				// return the results
				console.log('Geocoder parsing happens here.');
			}
		}

		/**
		 * Generic wrapper function that returns the value for one of the cached
		 * geocoder object keys.
		 * 
		 * @param {String} attr
		 * 			The key of the internal geocoder object
		 * @return {String}
		 * 			The value of specified key
		 */
		function _get(attr) {
			return geocodeObj[attr];
		}
		
		// Public methods and properties
		return {
			version: VERSION,
			
			/**
			 * @constructor
			 */
			init: function init(args) {
				console.info('Initializing Guier...');
				
				// Override any public properties passed in
				if (typeof args === 'object' && args.length > 0) {
					// alias the passed-in Geocoder object and set additional properties
					_geocoder = args.geocoder;
					_coordsObj = args.latlng;
				} else {
					// create a new Geocoder object if they didn't pass one in, but warn them about it
					throw new Error('Guier requires Google Maps API objects.');
				}
			},

			/**
			 * Gets the state from the internally-cached location object.
			 * 
			 * @return {String}
			 * 			The value of the state property
			 */
			getState: function getState() {
				return _get('state');
			},

			/**
			 * Gets the ZIP code from the internally-cached location object.
			 * 
			 * @return {String}
			 * 			The value of the ZIP property
			 */
			getZipCode: function getZipCode() {
				return _get('ZIP');
			},

			/**
			 * A method that returns a specified portion of the reverse-geocoded 
			 * address. This method also takes an option callback function for 
			 * additional processing, if needed.
			 * 
			 * @param {String} key
			 * 			The specific geocoder attribute to get
			 * @param {Object} callback (Optional)
			 * 			A callback function with custom logic for further processing
			 */
			locate: function locate(key, callback) {
				var tempKey = _get(key);

				if (callback !== undefined) {
					// Do callback shenanigans here
					// Should I pass the key in here? probably not.
					//callback(key);
				}

				return tempKey;
			}
		}
	}());
}(window));
