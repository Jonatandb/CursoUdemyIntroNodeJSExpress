const express = require('express')

const usersCtrl = require('../../controlles/v1/users-controller')

const { isValidHostname, isAuth, isAdmin } = require('../../middlewares/auth')

const router = express.Router()

/** '/login' se define como POST, porque si se definiera
 *  como GET entonces la información de email y password
 *  viajaría como texto plano y podría ser interceptada y
 *  podría ser hackeada sin importar si nosotros tenemos
 *  habilitado un certificado SSL y estamos consumiendo
 *  nuestra API REST utilizando HTTPS. Por lo tanto si
 *  tenemos habilitado un certificado SSL y estamos
 *  consumiendo nuestra API REST utilizando HTTPS es
 *  recomendable enviar al información sensible por POST.
 * */
router.post('/login', usersCtrl.login)
router.post('/create', usersCtrl.createUser)
router.post('/update', isValidHostname, isAuth, usersCtrl.updateUser)
router.post('/delete', isValidHostname, isAuth, isAdmin, usersCtrl.deleteUser)
router.get('/get-all', isValidHostname, isAuth, isAdmin, usersCtrl.getUsers)

module.exports = router
