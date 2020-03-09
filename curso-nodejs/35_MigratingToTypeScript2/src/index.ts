//const express = require('express')
import express, { Application } from 'express'

//const bodyParser = require('body-parser')
import bodyParser from 'body-parser'

//const mongoose = require('mongoose')
import mongoose from 'mongoose'

//const dotenv = require('dotenv')
import dotenv from 'dotenv'

// const moment = require('moment')
import moment from 'moment'

// const logger = require('./utils/logger')
//const routesV1 = require('./routes/v1')

dotenv.config()

const app: Application = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//routesV1(app)

const PORT: number | string = process.env.PORT!
const MONGO: string = process.env.MONGO!
const JWT_SECRET: string = process.env.JWT_SECRET!
const TOKEN_EXPIRES_IN: string = process.env.TOKEN_EXPIRES_IN!
const NODE_ENV: string = process.env.NODE_ENV!

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
