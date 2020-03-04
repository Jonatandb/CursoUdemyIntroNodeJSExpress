const bcrypt = require('bcrypt')
const User = require('../../mongo/models/users')
const jwt = require('jsonwebtoken')
const expiresIn = 60 * 10 // Tiempo en el que expirará el JWT: 60 segundos x 1 -> 1 minutos.

const login = async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if (user) {
			const isOk = await bcrypt.compare(password, user.password)
			if (isOk) {
				//console.log(
				//	'users-controller - login() - process.env.JWT_SECRET=',
				//	process.env.JWT_SECRET
				//)
				const token = jwt.sign(
					{ userId: user._id, role: user.role },
					process.env.JWT_SECRET,
					{ expiresIn }
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
	}
}
const getUsers = (req, res) => {
	console.log('users-controller - getUsers() - req.body:', req.body)
	res.send([
		{ id: 1, name: 'Jonatandb' },
		{ id: 2, name: 'David' }
	])
}

const createUser = async (req, res) => {
	try {
		//console.log('users-controller - createUser() - req.body:', req.body)

		const { username, password, email, data } = req.body

		const hash = await bcrypt.hash(password, 6)

		//console.log('Hashed password:', hash)

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
		console.log(result)
		res.send(result)
	} catch (error) {
		if (error.code && error.code === 11000) {
			const result = {
				status: 'DUPLICATED_VALUES',
				message: error.keyValue
			}
			res.status(400).send(result)
			console.log(result)
			return
		}
		res.status(500).send({
			status: 'ERROR',
			message: error.message
		})
		// console.log(`{status: 'ERROR', message: ${error.message}}`)
	}
}

const deleteUser = (req, res) => {
	console.log('users-controller - deleteUser() - req.body:', req.body)
	res.send('User deleted!')
}

const updateUser = async (req, res) => {
	// Espera un POST a la url: http://localhost:5000/api/v1/users/update
	// Con lo siguiente en el body (de tipo Content-Type: "application/json", Raw input):
	// {
	// 	"userId": "5e5acd54aae6193e9c8019da",
	// 	"email": "jonatandb@gmail.com",
	// 	"data": {
	// 		"age": 37,
	// 		"isMale": true
	// 	}
	// }
	try {
		//console.log('users-controller - updateUser() - req.body:', req.body)
		const { userId, username, password, email, data } = req.body
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
				status: 'DUPLICATED_VALUES',
				message: error.keyValue
			}
			res.status(400).send(result)
			console.log(result)
			return
		}
		res.status(500).send({
			status: 'ERROR',
			message: error.message
		})
	}
}

module.exports = {
	getUsers,
	createUser,
	deleteUser,
	updateUser,
	login
}
