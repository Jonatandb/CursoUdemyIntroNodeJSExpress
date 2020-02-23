var http = require('http')

var server = http.createServer(function (request, response) {

    console.log('Solicitud entrante desde: ', request.headers.host, 'url solicitada:', request.url)

    if (request.url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write('<html><head><title>Home page</title></head><body><p>Home page</p></body></html>')
        response.end()
    } else if (request.url === '/exit') {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.write('<html><head><title>Bye bye!</title></head><body><p>Bye bye!</p></body></html>')
        response.end()
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' })
        response.write('<html><head><title>Pagina no encontrada!</title></head><body><p>Pagina no encontrada!</p></body></html>')

        response.end()
    }
})

server.listen(4000)
console.log('Servidor ejecuntándose en el puerto 4000')