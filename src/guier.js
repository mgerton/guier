/**
 * Guier - A simple wrapper library for Google's Geocoder API
 * @author Matt Gerton <matt.gerton@gmail.com>
 * @version 0.1
 */
;(function(window, undefined) {
	'use strict';

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
		this.geocoder = ('geocoder' in args) ? args.geocoder : undefined;
		this.coordinates = ('coordinates' in args) ? args.coordinates : undefined;

		// We need these objects in order to make the magic happen
		if (this.geocoder === undefined || this.coordinates === undefined) {
			throw new Error('Guier requires Google Maps API objects to function.');
		}
		this._reverseGeocode();
	};

	/**
	 * @private
	 * Makes the API call to the Geocoder service
	 *
	 * @returns {Object} gp
	 * 			The Geoposition object
	 */
	Guier._reverseGeocode = function reverseGeocode() {
		// binding reference to this to anonymous function so that it is available in the callback
		this.geocoder.geocode({ 'latLng': this.coordinates }, (this._parseGeocodeObject).bind(this));
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
	// TODO(nathancharles): 'this' is referencing the window object. Fix?
	Guier._parseGeocodeObject = function parseGeocodeObject(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			var bestResult = results[0];
			var addressObject = results[0].address_components;

			console.info('Parsing geocode results...');

			// Whitelisted address components
			this.geoObject.address = bestResult.formatted_address;
			this.geoObject.city = Guier._extractFromAddress(addressObject, 'locality');
			this.geoObject.state = Guier._extractFromAddress(addressObject, 'administrative_area_level_1');
			this.geoObject.zip = Guier._extractFromAddress(addressObject, 'postal_code');

			// Additional address components
			this.geoObject.county = Guier._extractFromAddress(addressObject, 'administrative_area_level_2');

			console.info('Parsing Finished, location available');
		}
	};

	/**
	 * Loops through the address format returned by Google's Geocoder.
	 * It loops through each address component and checks it's type against the type passed in.
	 * It will return the long name of the address component.
	 * If the type isn't found, a blank string is returned.
	 *
	 * @param components{object} - The collection of address components.
	 * @param type{string} - The type of address component to extract.
	 *
	 * @return {string} - the address component requested, or an empty string if it doesn't exist.
	 */
	Guier._extractFromAddress = function extractFromAddress(components, type) {
		var componentsLength = components.length;
		for (var i = 0; i < componentsLength; i += 1) {
			var typesLength = components[i].types.length;
			for (var j = 0; j < typesLength; j += 1) {
				if (components[i].types[j] === type) {
					return components[i].long_name;
				}
			}
		}

		return '';
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
	// TODO: Deal with async location object definition.
	Guier.get = function get(attr, callback) {
		var searchableFields = ['city', 'state', 'zip', 'address', 'county'];
		var searchResult = '';
		var retval = '';

		if (searchableFields.indexOf(attr) !== -1) {
			searchResult = Guier.geoObject[attr];
		} else {
			console.error('The location attribute cannot be found.');
		}

		// Handle the callback
		if (callback !== undefined && typeof callback === 'function') {
			retval = callback(searchResult);
		} else {
			retval = searchResult;
		}

		return retval;
	};

	// Expose the Guier object for use
	window.Guier = Guier;
}(window));
