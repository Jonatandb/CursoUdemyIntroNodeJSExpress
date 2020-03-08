const Product = require('../../mongo/models/products')

const getProducts = async (req, res) => {
	try {
		console.log('products-controller - getProducts() - req.body:', req.body)
		const products = await Product.find()
			.select('title description price')
			.populate('user', 'username email data.age role')
		const result = { status: 'OK', data: products }
		res.send(result)
		console.log(result)
	} catch (error) {
		console.log(
			'products-controller - getProducts() - error:',
			error.message
		)
		res.status(500).send({
			status: 'ERROR',
			message: error.message
		})
	}
}

const createProduct = async (req, res) => {
	try {
		//console.log('products-controller - createProduct() - req.body:', req.body)

		const { title, description, price, images, userId } = req.body

		const product = await Product.create({
			title,
			description,
			price,
			images,
			user: userId
		})

		const result = { status: 'OK', data: product }

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

const deleteProduct = (req, res) => {
	console.log('products-controller - deleteProduct() - req.body:', req.body)
	res.send('Product deleted!')
}

module.exports = {
	getProducts,
	createProduct,
	deleteProduct
}
