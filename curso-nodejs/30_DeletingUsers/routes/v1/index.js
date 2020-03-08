const usersRoutes = require('./users-routes')
const productsRoutes = require('./products-routes')
const moment = require('moment')

module.exports = app => {
	app.use('/api/v1/users', usersRoutes)
	app.use('/api/v1/products', productsRoutes)

	const date = moment(new Date()).format('DD/MM/YYYY HH:mm:ss')

	app.use('/', (req, res, next) => {
		console.log(date, "app.use('/') - Llegó un request:", req.headers)
		res.send('<h1>Jonatandb te da la bienvenida!</h1>')
		next()
	})
}
