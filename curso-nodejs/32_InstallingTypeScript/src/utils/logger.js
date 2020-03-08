const moment = require('moment')

module.exports = logger = (message, params) => {
	const date = moment(new Date()).format('DD/MM/YYYY HH:mm:ss')
	process.env.NODE_ENV !== 'production' && params
		? console.log(date, message, params)
		: console.log(date, message)
}
