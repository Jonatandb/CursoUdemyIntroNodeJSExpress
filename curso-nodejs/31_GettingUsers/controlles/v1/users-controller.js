const bcrypt = require('bcrypt')
const User = require('../../mongo/models/users')
const Product = require('../../mongo/models/products')
const jwt = require('jsonwebtoken')
const expiresIn = process.env.TOKEN_EXPIRES_IN
const logger = require('../../utils/logger')

const login = async (req, res) => {
	try {
		logger('users-controller - login()')

		const { email, password } = req.body

		const user = await User.findOne({ email })

		if (user) {
			const isOk = await bcrypt.compare(password, user.password)

			const jwtExpiresIn = parseInt(expiresIn, 10)

			if (isOk) {
				const token = jwt.sign(
					{ userId: user._id, role: user.role },
					process.env.JWT_SECRET,
					{ expiresIn: jwtExpiresIn }
				)

				logger(
					'users-controller - login() -> User logged:',
					user.username
				)

				res.send({ status: 'OK', data: { token, expiresIn } })
			} else {
				res.status(403).send({
					status: 'INVALID_PASSWORD',
					message: ''
				})
			}
		} else {
			res.status(401).send({ status: 'USER_NOT_FOUND', message: '' })
		}
	} catch (e) {
		res.status(500).send({ status: 'ERROR', message: e.message })
		logger(`{status: 'ERROR', message: ${e.message}}`)
	}
}
const getUsers = async (req, res) => {
	try {
		logger('users-controller - getUsers()')

		//const users = await User.find().select('username email data')  // Trae solo campos especificados.

		const users = await User.find().select({ role: 0, password: 0 }) // Trae todos los campos excepto éstos.

		res.send({ status: 'OK', data: users })
	} catch (e) {
		res.status(500).send({ status: 'ERROR', message: e.message })
		logger(`{status: 'ERROR', message: ${e.message}}`)
	}
}

const createUser = async (req, res) => {
	try {
		logger('users-controller - createUser() - req.body:', req.body)

		const { username, password, email, data } = req.body

		const hash = await bcrypt.hash(password, 6)

		//process.env.NODE_ENV !== 'production' && console.log('Hashed password:', hash)

		// await Users.create({
		// 	username, // Es lo mismo que -> username: username
		// 	email,
		// 	data,
		// 	password: hash
		// })

		const user = new User()
		user.username = username
		user.password = hash
		user.email = email
		user.data = data
		await user.save()

		const result = { status: 'OK', message: 'User created!' }

		logger('users-controller - createUser() - result:', result)

		res.send(result)
	} catch (error) {
		if (error.code && error.code === 11000) {
			const result = {
				status: 'DUPLICATED_VALUES',
				message: error.keyValue
			}

			res.status(400).send(result)

			logger('users-controller - createUser() - Error:', result)

			return
		}
		res.status(500).send({
			status: 'ERROR',
			message: error.message
		})
		logger(`{status: 'ERROR', message: ${error.message}}`)
	}
}

const deleteUser = async (req, res) => {
	try {
		const { userId } = req.body

		logger('users-controller - deleteUser() - userId:', userId)

		if (userId) {
			await User.findByIdAndRemove(userId)

			await Product.deleteMany({ user: userId })

			res.send('User deleted!')

			logger('users-controller - deleteUser() - User deleted!')
		} else {
			throw new Error('Missing param userId')
		}
	} catch (error) {
		res.status(500).send({ status: 'ERROR', message: error.message })
		logger(`{status: 'ERROR', message: ${error.message}}`)
	}
}

const updateUser = async (req, res) => {
	// Espera un POST a la url: http://localhost:PORT/api/v1/users/update
	// Con lo siguiente en el body (de tipo Content-Type: "application/json", Raw input):
	// {
	// 	"username" : "Jonatandb",
	// 	"password" : "",
	//	"email" : "jonatandb@gmail.com",
	// 	"data": {
	// 		"age": 37,
	// 		"isMale": true
	// 	}
	// }
	try {
		logger('users-controller - updateUser() - req.body:', req.body)

		const { username, password, email, data } = req.body

		const { userId } = req.sessionData

		await User.findByIdAndUpdate(
			userId,

			{
				username,
				password,
				email,
				data
			},

			{ useFindAndModify: false }
		)

		res.send('User updated!')
	} catch (error) {
		if (error.code && error.code === 11000) {
			const result = {
				status: 'updateUser - DUPLICATED_VALUES',
				message: error.keyValue
			}
			logger('users-controller - updateUser() - result:', result)
			res.status(400).send(result)
		} else {
			res.status(500).send({
				status: 'updateUser - ERROR',
				message: error.message
			})
		}
	}
}

module.exports = {
	getUsers,
	createUser,
	deleteUser,
	updateUser,
	login
}
