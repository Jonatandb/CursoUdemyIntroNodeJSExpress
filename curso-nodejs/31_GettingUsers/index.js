const express = require('express')
const url = require('url')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const moment = require('moment')
const logger = require('./utils/logger')
const dotenv = require('dotenv')
dotenv.config()

const routesV1 = require('./routes/v1')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

routesV1(app)

const { PORT, MONGO, JWT_SECRET, TOKEN_EXPIRES_IN, NODE_ENV } = process.env

const date = moment(new Date()).format('DD/MM/YYYY HH:mm:ss')

console.log(
	date,
	NODE_ENV !== ''
		? 'Running on ' + NODE_ENV + ' mode.'
		: 'NODE_ENV not setted.'
)

if (!PORT || !MONGO || !JWT_SECRET || !TOKEN_EXPIRES_IN) {
	!PORT && console.log(date, ":( PORT can't be empty, check the .env file.")
	!MONGO && console.log(date, ":( MONGO can't be empty, check the .env file.")
	!JWT_SECRET &&
		console.log(date, ":( JWT_SECRET can't be empty, check the .env file.")
	!TOKEN_EXPIRES_IN &&
		console.log(
			date,
			":( TOKEN_EXPIRES_IN can't be empty, check the .env file."
		)
} else {
	mongoose
		.connect(MONGO, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(() => {
			console.log('-------------', date, '-------------')
			console.log(date, 'Connected to MongoDB.')
			app.listen(PORT, () =>
				console.log(date, `Server running on port ${PORT}.`)
			)
		})
		.catch(err => {
			console.log('Error connecting to Mongo!', err)
		})
}
