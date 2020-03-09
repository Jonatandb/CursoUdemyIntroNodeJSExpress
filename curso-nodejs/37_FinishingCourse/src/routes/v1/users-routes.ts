import express from 'express'
import usersCtrl from '../../controlles/v1/users-controller'
import { isValidHostname, isAuth, isAdmin } from '../../middlewares/auth'

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

export default router
