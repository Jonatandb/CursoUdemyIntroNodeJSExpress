const { info, error } = require('./../modules/06_my-log') // Depende de ./modules/my-log.js
const { countries, languages } = require('countries-list')

const routes = app => {
	app.get('/', (req, res) => {
		res.status(200).send(
			'<html><head><title>Home page</title></head><body><p>Express powered Home page!</p></body></html>'
		)
	})

	app.get('/country', (req, res) => {
		console.log(
			'---------------------------------------',
			new Date().toLocaleString()
		)
		console.log('req.query:', req.query)

		if (!req.query || !req.query.code) {
			res.send(
				'<html><head><title>Oh oh!</title></head><body><p>You should pass something like: <pre>/country?code=AR</pre></p></body></html>'
			)
		} else if (!countries[req.query.code.toUpperCase()]) {
			res.send(
				'<html><head><title>Oh oh!</title></head><body><p>Invalid country code :-(</p></body></html>'
			)
		} else {
			console.log(
				'Country requested: ' + req.query.code + ' -> ',
				countries[req.query.code.toUpperCase()]
			)
			res.send(countries[req.query.code.toUpperCase()])
		}
	})

	app.get('/languages/:lang', (req, res) => {
		console.log(
			'---------------------------------------',
			new Date().toLocaleString()
		)
		console.log('req.params:', req.params)

		if (!req.params.lang) {
			res.json({
				status: 500,
				message: 'You should pass something like: /languages/es'
			})
		} else if (!languages[req.params.lang.toLowerCase()]) {
			res.json({
				status: 500,
				message: 'Invalid language'
			})
		} else {
			console.log(
				'Language requested: ' + req.params.lang + ' -> ',
				languages[req.params.lang.toLowerCase()]
			)
			res.json({
				status: 200,
				data: languages[req.params.lang.toLowerCase()]
			})
		}
	})

	app.get('/languages/:lang/:country', (req, res) => {
		console.log(
			'---------------------------------------',
			new Date().toLocaleString()
		)
		console.log('req.params:', req.params)

		if (!req.params.lang) {
			res.json({
				status: 500,
				message: 'You should pass something like: /languages/es'
			})
		} else if (!languages[req.params.lang.toLowerCase()]) {
			res.json({
				status: 500,
				message: 'Invalid language'
			})
		} else {
			console.log(
				'Language requested: ' + req.params.lang + ' -> ',
				languages[req.params.lang.toLowerCase()]
			)
			console.log(
				'Country requested: ' + req.params.country + ' -> ',
				countries[req.params.country.toUpperCase()]
			)
			const result = {
				status: 200,
				language: languages[req.params.lang.toLowerCase()],
				country: countries[req.params.country.toUpperCase()]
			}
			res.json(result)
		}
	})

	app.get('/info', (req, res) => {
		var parsed = url.parse(req.url)
		var pathName = parsed.pathname
		console.log('req.url:', req.url)
		console.log('url.parse(req.url):', parsed)
		console.log('url.parse(req.url).pathname:', pathName)
		var result = info(pathName)
		res.send(result)
		//.send() por defecto envía el status 200
		// por lo que ".status(200)" es opcional.
	})

	// **** Este debe ser el último endpoint, sino se hace cargo de todos los requests:  *****
	app.get('*', (req, res) => {
		res.status(404).send(
			'<html><head><title>Pagina no encontrada!</title></head><body><p>Pagina no encontrada!</p></body></html>'
		)
	})
}

module.exports = routes
