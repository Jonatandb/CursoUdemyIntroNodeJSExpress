var { info, error } = require('./modules/06_my-log')   // Depende de ./modules/my-log.js
var { countries } = require('countries-list')
var http = require('http')
var url = require('url')
var querystring = require('querystring')

var server = http.createServer(function (request, response) {

    // request contiene información sobre la conexión entrante
    //  se puede obtener los headers, la ip, el dominio, etc

    // response se utiliza para devolverle una respuesta al cliente
    //  por ej puedo devolver un status code:
    //      200 petición correcta
    //      500 error interno
    //      403 no se posee acceso al recurso solicitado

    console.log('Solicitud entrante desde: ', request.headers.host, 'url solicitada:', request.url)

    var parsed = url.parse(request.url)
    console.log("parsed:", parsed)

    var pathName = parsed.pathname

    var query = querystring.parse(parsed.query)

    console.log("Query:", query)

    console.log("Country code:", query.code)


    if (pathName === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write('<html><head><title>Home page</title></head><body><p>Home page</p></body></html>')
        response.end()

    } else if (pathName === '/exit') {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write('<html><head><title>Bye bye!</title></head><body><p>Bye bye!</p></body></html>')
        response.end()

    } else if (pathName === '/country') {
        if (!query || !query.code) {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.write('<html><head><title>Oh oh!</title></head><body><p>You should pass something like: <pre>/country?code=AR</pre></p></body></html>')
            response.end()
            return
        }

        if (!countries[query.code.toUpperCase()]) {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.write('<html><head><title>Oh oh!</title></head><body><p>Invalid country code :-(</p></body></html>')
            response.end()
            return
        }

        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.write(JSON.stringify(countries[query.code.toUpperCase()]))
        response.end()

    } else if (pathName === '/info') {
        var result = info(pathName)
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write(result)
        response.end()

    } else if (pathName === '/error') {
        var result = error(pathName)
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write(result)
        response.end()

    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' })
        response.write('<html><head><title>Pagina no encontrada!</title></head><body><p>Pagina no encontrada!</p></body></html>')
        response.end()

    }
})

server.listen(4000)
console.log('Servidor ejecuntándose en el puerto 4000')