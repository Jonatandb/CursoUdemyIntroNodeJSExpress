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

const getProductsByUserId = async (req, res) => {
	try {
		console.log(
			'products-controller - getProductsByUserId() - req.params:',
			req.params
		)
		const products = await Product.find({
			user: req.params.userId
		})
		const result = { status: 'OK', data: products }
		res.send(result)
		console.log(result)
	} catch (error) {
		console.log(
			'products-controller - getProductsByUserId() - error:',
			error.message
		)
		res.status(500).send({
			status: 'ERROR',
			message: error.message
		})
	}
}

const getProductsCheaperThan100 = async (req, res) => {
	try {
		console.log('products-controller - getProductsCheaperThan100() ')
		const products = await Product.find({
			price: { $lt: 100 }
		})
		const result = { status: 'OK', data: products }
		res.send(result)
		console.log(result)
	} catch (error) {
		console.log(
			'products-controller - getProductsCheaperThan100() - error:',
			error.message
		)
		res.status(500).send({
			status: 'ERROR',
			message: error.message
		})
	}
}

const getProductsGreaterThan100 = async (req, res) => {
	try {
		console.log('products-controller - getProductsGreaterThan100() ')
		const products = await Product.find({
			price: { $gt: 100 }
		})
		const result = { status: 'OK', data: products }
		res.send(result)
		console.log(result)
	} catch (error) {
		console.log(
			'products-controller - getProductsGreaterThan100() - error:',
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
	getProductsByUserId,
	getProductsCheaperThan100,
	getProductsGreaterThan100,
	createProduct,
	deleteProduct
}
