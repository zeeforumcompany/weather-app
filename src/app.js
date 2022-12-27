const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
// const ROOT_PATH = path.dirname(__dirname)
const PUBLIC_PATH = path.join(__dirname, '../public')
const VIEWS_PATH = path.join(__dirname, '../templates/views')
const PARTIALS_PATH = path.join(__dirname, '../templates/partials')


const app = express();


// Setup handlebar engines & views location
app.set('view engine', 'hbs')
app.set('views', VIEWS_PATH)
hbs.registerPartials(PARTIALS_PATH)

// Middleware
// Setup static directory to serve
app.use(express.static(PUBLIC_PATH))


// Requests
app.get('', (req, res) => {
	res.render('index', {
		title: "Weather App",
		name: "Zee Forum"
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: "About",
		name: "Zee Forum"
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: "Help",
		help_msg: "This is an example help message.",
		name: "Zee Forum"
	})
})

app.get('/weather', (req, res) => {
	let { address } = req.query

	if (!address)
        return res.send({
			error: "Provide an address to get weather information"
		})

	geocode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({
				error
			})
		}
	
		forecast(latitude, longitude, (error, forecastData = '') => {
			if (error)
				return res.send({
					error
				});

			return res.send({
				forecast: forecastData,
				location,
				address
			})
		});
	});
})

app.get('/products', (req, res) => {
	let { search } = req.query
	
	if (!search) {
		return res.send({
			error: "You must provide a search term"
		})
	}

	return res.send({
		products: [
			"Sega Games",
			"Taken 3",
			"Mario"
		]
	})
})

app.get('/help/*', (req, res) => {
	return res.render('404', {
		title: '404 - Page',
		message: 'Help article not found!',
		name: 'Zee Forum'
	})
});

app.get('*', (req, res) => {
	return res.render('404', {
		title: '404 - Help Page',
		message: 'Page not found!',
		name: 'Zee Forum'
	})
})

const PORT = 80
app.listen(PORT, () => {
	console.log('Listening on port http://localhost:' + PORT)
})