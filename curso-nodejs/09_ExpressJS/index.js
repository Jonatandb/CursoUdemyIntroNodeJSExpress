const express = require('express')
const url = require('url')

const { info, error } = require('./modules/06_my-log')   // Depende de ./modules/my-log.js
const { countries } = require('countries-list')

const app = express()
const port = 4000

app.get('/', function (req, res) {
    res.status(200).send('<html><head><title>Home page</title></head><body><p>Express powered Home page!</p></body></html>')
})

app.get('/info', function (req, res) {
    var parsed = url.parse(req.url)
    var pathName = parsed.pathname
    console.log("req.url:", req.url)
    console.log("url.parse(req.url):", parsed)
    console.log("url.parse(req.url).pathname:", pathName)
    var result = info(pathName)
    res.send(result)
    //.send() por defecto envía el status 200
    // por lo que ".status(200)" es opcional.
})

// **** Este debe ser el último endpoint, sino se hace cargo de todos los requests:  *****
app.get('*', function (req, res) {
    res.status(404).send('<html><head><title>Pagina no encontrada!</title></head><body><p>Pagina no encontrada!</p></body></html>')
})

app.listen(port, () => console.clear() & console.log(`Servidor ejecutándose en el puerto ${port}`))

//     console.log('Solicitud entrante desde: ', request.headers.host, 'url solicitada:', request.url)

//     var query = querystring.parse(parsed.query)
//     console.log("Query:", query)
//     console.log("Country code:", query.code)

//     } else if (pathName === '/exit') {
//         response.writeHead(200, { 'Content-Type': 'text/html' })
//         response.write('<html><head><title>Bye bye!</title></head><body><p>Bye bye!</p></body></html>')
//         response.end()

//     } else if (pathName === '/country') {
//         if (!query || !query.code) {
//             response.writeHead(200, { 'Content-Type': 'text/html' })
//             response.write('<html><head><title>Oh oh!</title></head><body><p>You should pass something like: <pre>/country?code=AR</pre></p></body></html>')
//             response.end()
//             return
//         }

//         if (!countries[query.code.toUpperCase()]) {
//             response.writeHead(200, { 'Content-Type': 'text/html' })
//             response.write('<html><head><title>Oh oh!</title></head><body><p>Invalid country code :-(</p></body></html>')
//             response.end()
//             return
//         }

//         response.writeHead(200, { 'Content-Type': 'application/json' })
//         response.write(JSON.stringify(countries[query.code.toUpperCase()]))
//         response.end()

//     } else if (pathName === '/error') {
//         var result = error(pathName)
//         response.writeHead(200, { 'Content-Type': 'text/html' })
//         response.write(result)
//         response.end()