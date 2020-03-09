const moment = require('moment')

export default (message: string, params?: any): void => {
	const date = moment(new Date()).format('DD/MM/YYYY HH:mm:ss')
	process.env.NODE_ENV !== 'production' && params
		? console.log(date, message, params)
		: console.log(date, message)
}
