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

const updateUser = (req, res) => {
	console.log('users-controller - updateUser() - req.body:', req.body)
	res.send('User updated!')
}

module.exports = {
	getUsers,
	createUser,
	deleteUser,
	updateUser
}
