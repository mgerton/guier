/**
 * Guier - A simple wrapper library for Google's Geocoder API
 * @author Matt Gerton <matt.gerton@gmail.com>
 * @version 0.1
 */
;(function(window, undefined) {
	// var Guier = window.Guier || {};
	// window.Guier = Guier;

	var VERSION = '0.1.0';

	/**
	 * Create the Guier object to attach methods to
	 */
	var Guier = window.Guier || {};

	/**
	 * @constructor
	 * Bootstraps the library by storing references to the Google 
	 * Maps API objects
	 *
	 * @param {Object} args
	 * 			An object literal of arguments to be applied to the library
	 */
	Guier.init = function init(args) {
		console.info('Initializing Guier...');

		// An object literal where the parsed geocode data will be stored
		this.geoObject = {};

		// References to the Google API objects
		this.geocoder = (args.geocoder) ? args.geocoder : undefined;
		this.coordinates = (args.latlng) ? args.latlng : undefined;

		// We need these objects in order to make the magic happen
		if (this.geocoder === undefined || this.coordinates === undefined) {
			throw new Error('Guier requires Google Maps API objects to function.');
		}
	};

	/**
	 * @private
	 * Makes the API call to the Geocoder service
	 *
	 * @returns {Object} gp
	 * 			The Geoposition object
	 */
	Guier._reverseGeocode = function reverseGeocode() {
		this.geocoder.geocode({ 'latlng': this.coordinates }, _parseGeocodeObject);
	};

	/**
	 * @private
	 * Callback function used when Google geocode() method is called. This 
	 * method parses the returned Geocoder object and sets it to an internal 
	 * object that is used to return data via the public API methods.
	 * 
	 * @param {Object} results
	 * 			An object with the resulting geocode data
	 * @param {String} status
	 * 			A status code
	 */
	// TODO(mgerton): Finish implementing me!
	Guier._parseGeocodeObject = function parseGeocodeObject(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			// return the results
			console.log('Geocoder parsing happens here.');
			console.log('store all of the nicely parsed data in this.geoObject');
		}
	};

	/**
	 * Main accessor method. Takes a string representing the requested 
	 * geocode data and an optional callback and returns the information
	 * 
	 * @param {String} attr
	 * 			A string containing the type of requested data
	 * @param {Function} callback
	 * 			An optional callback function
	 */
	Guier.get = function get(attr, callback) {
		var searchableFields = ['city', 'state', 'zip', 'address'];
		var searchResult = '';
		var retval = '';

		if (searchableFields.indexOf(attr) !== -1) {
			searchResult = this.geoObject[attr];
		} else {
			throw new Error('The location attribute cannot be found.');
		}

		if (typeof callback === 'object' && callback !== undefined) {
			retval = callback(result);
		}

		return retval;
	};

	// Expose the Guier object for use
	window.Guier = Guier;
}(window));
