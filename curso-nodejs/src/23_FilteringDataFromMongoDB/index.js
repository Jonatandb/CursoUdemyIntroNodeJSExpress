const express = require('express')
const url = require('url')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routesV1 = require('./routes/v1')
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 'Empty!'
const MONGO = process.env.MONGO || 'Empty!'

//console.log(__filename + ' - process.env.PORT:', PORT)
//console.log(__filename + ' - process.env.MONGO:', MONGO)

mongoose
	.connect(MONGO, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('Conectado a MongoDB!')
	})
	.catch(err => {
		console.log('Error conectando a MongoDB!', err)
	})

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

routesV1(app)

app.listen(PORT, () =>
	console.log(
		`Servidor ejecutándose en el puerto ${PORT} (${new Date().toLocaleTimeString()})`
	)
)
