var log = require('./modules/my-log')   // Depende de ./modules/my-log.js

var http = require('http')

var server = http.createServer(function (request, response) {

    // request contiene información sobre la conexión entrante
    //  se puede obtener los headers, la ip, el dominio, etc

    // response se utiliza para devolverle una respuesta al cliente
    //  por ej puedo devolver un status code:
    //      200 petición correcta
    //      500 error interno
    //      403 no se posee acceso al recurso solicitado


    console.log('Solicitud entrante desde: ', request.headers.host, 'url solicitada:', request.url)

    if (request.url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write('<html><head><title>Home page</title></head><body><p>Home page</p></body></html>')
        response.end()
    } else if (request.url === '/exit') {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write('<html><head><title>Bye bye!</title></head><body><p>Bye bye!</p></body></html>')
        response.end()
    } else if (request.url === '/info') {
        var result = log.info(request.url)
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write(result)
        response.end()
    } else if (request.url === '/error') {
        var result = log.error(request.url)
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