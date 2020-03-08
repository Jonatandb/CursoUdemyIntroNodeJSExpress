const usersRoutes = require('./users-routes')
const productsRoutes = require('./products-routes')
const logger = require('../../utils/logger')

module.exports = app => {
	app.use('/api/v1/users', usersRoutes)
	app.use('/api/v1/products', productsRoutes)

	app.use('/', (req, res, next) => {
		logger("app.use('/') - Llegó un request:", req.headers)
		res.send('<h1>Jonatandb te da la bienvenida!</h1>')
		next()
	})
}
