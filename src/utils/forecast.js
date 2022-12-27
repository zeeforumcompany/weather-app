const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
	const WEATHER_STACK_API_KEY = '900c9b0be02c33feb44fa602602a362a';
	const QUERY = latitude + ',' + longitude;
	const URL = 'http://api.weatherstack.com/current?access_key=' + WEATHER_STACK_API_KEY + '&query=' + QUERY + '&units=f';

	request(URL, { json: true }, (error, response, body) => {
		if (error) {
			callback('Unable to connect to weather service.');
		} else if (body.success === false) {
			callback(body.error.info);
		} else {
			const { weather_descriptions, temperature, feelslike } = body.current;

			callback(undefined, `${weather_descriptions[0]}. It's currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`);
		}
	});
}

module.exports = forecast