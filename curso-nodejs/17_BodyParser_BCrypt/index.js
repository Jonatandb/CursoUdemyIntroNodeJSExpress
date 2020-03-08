const express = require('express')
const url = require('url')
const bodyParser = require('body-parser')

const routesV1 = require('./routes/v1')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

routesV1(app)

app.listen(
	4000,
	() =>
		console.clear() & console.log(`Servidor ejecutándose en el puerto 4000`)
)
