## Guier

Guier is a wrapper library for the [Google Maps API](https://developers.google.com/maps/documentation/javascript/geocoding). Guier specifically targets users who are looking for a more simplified way to work with data Google's API returns when working with reverse-geocoding (returning a human-readable location from coordinates).

# Installation and Basic Usage
As with most JavaScript libraries, you'll first want to grab a copy of the library and add it into your page after the Maps API script tag:

```html
<script src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script src="guier.js"></script>
```

From here, you have two different methods in which you can use Guier to get your location data:
1. Call Guier's `init()` method in a basic onload event, explicitly defining the coordinates to use:
```js
// We start by initializing the Google Maps objects to enforce loose coupling
var geocoder = new google.maps.Geocoder();
var latlng = new google.maps.Latlng(45.24645, -110.24346);

// Now we pass the Geocoder and Latlng objects into Guier's init() method
Guier.init({
	geocoder: geocoder,
	coordinates: latlng
});

console.log(Guier.getCity());	// Outputs 'Chicago'
```
2. Utilize the HTML5 Geolocation API and initialize Guier within the `geolocation` object's callback
```js
var geolocation = navigator.geolocation ? navigator.geolocation : false;
if (!!geolocation) {
	geolocation.getCurrentPosition(function () {
		var latlng = new google.maps.Latlng(position.coords.latitude, position.coords.longitude);
		Guier.init({
			geocoder: geocoder,
			coordinates: latlng
		});
	});
}
```