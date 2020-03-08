const express = require('express')
const url = require('url')

const routes = require('./routes')

const app = express()
const port = 4000

routes(app)

app.listen(
	port,
	() =>
		console.clear() &
		console.log(`Servidor ejecutándose en el puerto ${port}`)
)
