document.addEventListener('DOMContentLoaded', () => {
	const weatherForm = document.querySelector('form');
	const weatherForecast = document.querySelector('.weather-forecast');
	const errorMessage = document.querySelector('.error-msg');

	weatherForm.addEventListener('submit', (event) => {
		event.preventDefault();

		errorMessage.textContent = 'Loading...';
		weatherForecast.textContent = '';
		
		const location = weatherForm.location.value;

		fetch('/weather?address=' + location)
		.then(response => response.json())
		.then(data => {
			let { forecast, error, location } = data
			if (error) return errorMessage.textContent = error;
		
			errorMessage.textContent = '';
			weatherForecast.innerHTML = location;
			weatherForecast.innerHTML += "<br /><br />" + forecast;
		});
	});
});