const jwt = require('jsonwebtoken')

const isValidHostname = (req, res, next) => {
	//console.log('isValidHostname() - req.hostname =', req.hostname)
	const validHosts = ['localhost']
	if (validHosts.includes(req.hostname)) next()
	else res.status(403).send({ status: 'isValidHostname - ACCESS_DENIED' })
}

const isAuth = (req, res, next) => {
	try {
		//console.log('isAuth() - req.headers.token = ', req.headers.token)
		const { token } = req.headers
		if (token) {
			const data = jwt.verify(token, process.env.JWT_SECRET)
			req.sessionData = { userId: data.userId }
			next()
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

module.exports = { isValidHostname, isAuth }
