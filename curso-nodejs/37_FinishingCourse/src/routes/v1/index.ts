import usersRoutes from './users-routes'
import productsRoutes from './products-routes'
import logger from '../../utils/logger'
import { Request, Response, NextFunction } from 'express'
import { Application } from 'express'

export default (app: Application): void => {
	app.use('/api/v1/users', usersRoutes)
	app.use('/api/v1/products', productsRoutes)

	app.use('/', (req: Request, res: Response, next: NextFunction) => {
		logger("app.use('/') - Llegó un request:", req.headers)
		res.send('<h1>Jonatandb te da la bienvenida!</h1>')
		next()
	})
}
