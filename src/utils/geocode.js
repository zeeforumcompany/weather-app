const request = require('postman-request');

const geocode = (location, callback) => {
	const PLACE_TO_SEARCH = encodeURIComponent(location);
	const OPENMAP_API_KEY = 'pk.eyJ1IjoiemVlZm9ydW1jb21wYW55IiwiYSI6ImNqdWI5OGw1OTAzY3U0NHBkZ2oydjY5NG8ifQ.le6ncI83L9C5LmoeUzUR6w';
	const GEOCODE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + PLACE_TO_SEARCH + '.json?access_token=' + OPENMAP_API_KEY;

	request(GEOCODE_URL, { json: true }, (error, response, body) => {
		if (error) {
			callback('Unable to connect to geocode service.');
		} else if (body.message !== undefined) {
			callback(body.message);
		} else if (body.features === undefined || body.features.length === 0) {
			callback('Unable to find location.');
		} else {
			const { place_name: placeName, geometry } = body.features[0];
			const [longitude, latitude] = geometry.coordinates;

			const data = {
				latitude,
				longitude,
				location: placeName
			};

			callback(undefined, data);
		}
	});
}

module.exports = geocode