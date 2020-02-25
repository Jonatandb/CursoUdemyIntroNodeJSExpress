const express = require('express')
const url = require('url')

const routesV1 = require('./routes/v1')

const app = express()

routesV1(app)

app.listen(
	4000,
	() =>
		console.clear() & console.log(`Servidor ejecutándose en el puerto 4000`)
)
