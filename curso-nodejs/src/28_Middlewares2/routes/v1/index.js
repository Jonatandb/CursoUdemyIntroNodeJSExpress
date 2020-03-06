const usersRoutes = require('./users-routes')
const productsRoutes = require('./products-routes')

module.exports = app => {
	app.use('/api/v1/users', usersRoutes)
	app.use('/api/v1/products', productsRoutes)
	app.use('/', (req, res, next) => {
		console.log(
			new Date().toLocaleString(),
			'Llegó un request!, req:',
			req.headers
		)
		res.send('<h1>Jonatandb te da la bienvenida!</h1>')
		next()
	})
}
