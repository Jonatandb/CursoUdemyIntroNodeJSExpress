const express = require('express')

const usersController = require('../../controlles/v1/users-controller')

const router = express.Router()

router.post('/create', usersController.createUser)
router.post('/update', usersController.updateUser)
router.post('/delete', usersController.deleteUser)
router.get('/get-all', usersController.getUsers)

module.exports = router
