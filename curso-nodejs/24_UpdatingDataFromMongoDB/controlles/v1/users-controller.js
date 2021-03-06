const bcrypt = require('bcrypt')
const User = require('../../mongo/models/users')

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
		console.log('users-controller - updateUser() - req.body:', req.body)
		const { userId, email, data } = req.body
		await User.findByIdAndUpdate(userId, {
			email,
			data
		})
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
	updateUser
}
