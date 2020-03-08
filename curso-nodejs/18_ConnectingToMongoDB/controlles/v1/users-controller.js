const bcrypt = require('bcrypt')

const getUsers = (req, res) => {
	console.log('users-controller - getUsers() - req.body:', req.body)
	res.send([
		{ id: 1, name: 'Jonatandb' },
		{ id: 2, name: 'David' }
	])
}

const createUser = async (req, res) => {
	try {
		console.log('users-controller - createUser() - req.body:', req.body)
		const hash = await bcrypt.hash(req.body.password, 6)
		res.send('User created!')
		console.log('Hashed password:', hash)
	} catch (error) {
		console.log('Error al hashear la contraseña')
		res.status(500).send({
			status: 'ERROR',
			message: 'No se pudo hashear la contraseña, error: ' + error.message
		})
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
