const express = require('express')
const url = require('url')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const moment = require('moment')
dotenv.config()

const routesV1 = require('./routes/v1')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

routesV1(app)

const PORT = process.env.PORT
const MONGO = process.env.MONGO
const JWT_SECRET = process.env.JWT_SECRET

if (!PORT || !MONGO || !JWT_SECRET) {
	!PORT &&
		console.log(
			PORT === ''
				? ":( PORT can't be empty, check the .env file."
				: 'PORT Ok.'
		)
	!MONGO &&
		console.log(
			MONGO === ''
				? ":( MONGO can't be empty, check the .env file."
				: 'MONGO Ok.'
		)
	!JWT_SECRET &&
		console.log(
			JWT_SECRET === ''
				? ":( JWT_SECRET can't be empty, check the .env file."
				: 'JWT_SECRET Ok.'
		)
} else {
	mongoose
		.connect(MONGO, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(() => {
			const date = moment(new Date()).format('DD/MM/YYYY HH:mm:ss')
			console.log('--', date, '--')
			console.log('Connected to MongoDB.')
			app.listen(PORT, () =>
				console.log(`Server running on port ${PORT}.`)
			)
		})
		.catch(err => {
			console.log('Error connecting to Mongo!', err)
		})
}
