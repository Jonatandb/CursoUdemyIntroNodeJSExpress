import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import logger from '../utils/logger'

const isValidHostname = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	logger('Middleware isValidHostname() - req.hostname =', req.hostname)
	const validHosts = ['localhost']
	if (validHosts.includes(req.hostname)) {
		next()
		logger('Middleware isValidHostname -> Hostname:', req.hostname)
	} else res.status(403).send({ status: 'isValidHostname - ACCESS_DENIED' })
}

const isAuth = (req: Request, res: Response, next: NextFunction): void => {
	try {
		logger('Middleware isAuth() - req.headers.token = ', req.headers.token)
		const { token } = req.headers
		if (token) {
			const data: any = jwt.verify(
				token as string,
				process.env.JWT_SECRET!
			)
			req.sessionData = { userId: data.userId, role: data.role }
			next()
			logger('Middleware isAuth -> User id:', data.userId)
		} else
			throw {
				code: 403,
				status: 'ACCESS_DENIED',
				message: 'Missing header token'
			}
	} catch (error) {
		res.status(error.code || 500).send({
			status: 'isAuth - ' + (error.status || 'ERROR'),
			message: error.message || 'ERROR'
		})
	}
}

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
	try {
		logger('Middleware isAdmin() -> req.sessionData = ', req.sessionData)
		if (req.sessionData.role !== 'admin') {
			throw {
				code: 403,
				status: 'ACCESS_DENIED',
				message: 'Invalid role'
			}
		}
		next()
		logger('Middleware isAdmin -> User role:', req.sessionData.role)
	} catch (error) {
		res.status(error.code || 500).send({
			status: 'isAdmin - ' + (error.status || 'ERROR'),
			message: error.message || 'ERROR'
		})
	}
}

export { isValidHostname, isAuth, isAdmin }
