const getUsers = (req, res) => {
	console.log('users-controller - getUsers()')
	res.send([
		{ id: 1, name: 'Jonatandb' },
		{ id: 2, name: 'David' }
	])
}

const createUser = (req, res) => {
	console.log('users-controller - createUser()')
	res.send('User created!')
}

const deleteUser = (req, res) => {
	console.log('users-controller - deleteUser()')
	res.send('User deleted!')
}

const updateUser = (req, res) => {
	console.log('users-controller - updateUser()')
	res.send('User updated!')
}

module.exports = {
	getUsers,
	createUser,
	deleteUser,
	updateUser
}
