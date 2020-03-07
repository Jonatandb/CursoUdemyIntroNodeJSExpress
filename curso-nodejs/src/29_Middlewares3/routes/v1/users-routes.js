const express = require('express')

const usersController = require('../../controlles/v1/users-controller')

const { isValidHostname, isAuth } = require('../../middlewares/auth')

const router = express.Router()

/** /login se define como POST, porque si se definiera
 *  como GET entonces la información de email y password
 *  viajaría como texto plano y podría ser interceptada y
 *  podría ser hackeada sin importar si nosotros tenemos
 *  habilitado un certificado SSL y estamos consumiendo
 *  nuestra API REST utilizando HTTPS. Por lo tanto si
 *  tenemos habilitado un certificado SSL y estamos
 *  consumiendo nuestra API REST utilizando HTTPS es
 *  recomendable enviar al información sensible por POST.
 * */
router.post('/login', usersController.login)
router.post('/create', usersController.createUser)
router.post('/update', isValidHostname, isAuth, usersController.updateUser)
router.post('/delete', usersController.deleteUser)
router.get('/get-all', usersController.getUsers)

module.exports = router
