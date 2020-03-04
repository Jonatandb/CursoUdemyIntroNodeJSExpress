const jwt = require('jsonwebtoken')

const isValidHostname = (req, res, next) => {
	//console.log('isValidHostname() - req.hostname =', req.hostname)
	const validHosts = ['localhost']
	if (validHosts.includes(req.hostname)) next()
	else res.status(403).send({ status: 'ACCESS_DENIED' })
}

const isAuth = (req, res, next) => {
	try {
		//console.log('isAuth() - req.headers.token = ', req.headers.token)
		const { token } = req.headers
		if (token) {
			const result = jwt.verify(token, process.env.JWT_SECRET)
			//console.log('isAuth() - jwt.verift result', result)
			next()
		} else
			throw {
				code: 403,
				status: 'ACCESS_DENIED',
				message: 'Missing header token'
			}
	} catch (error) {
		//console.log(error)
		res.status(error.code || 500).send({
			status: error.status || 'ERROR',
			message: error.message || 'ERROR'
		})
	}
}

module.exports = { isValidHostname, isAuth }
