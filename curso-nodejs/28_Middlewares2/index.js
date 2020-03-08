const express = require('express')
const url = require('url')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const routesV1 = require('./routes/v1')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

routesV1(app)

const PORT = process.env.PORT || 4000
const MONGO = process.env.MONGO || 'Empty!'

mongoose
	.connect(MONGO, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('Conectado a MongoDB!')
		app.listen(PORT, () =>
			console.log(
				`Servidor ejecutándose en el puerto ${PORT} (${new Date().toLocaleTimeString()})`
			)
		)
	})
	.catch(err => {
		console.log('Error conectando a MongoDB!', err)
	})
