import { Request, Response } from 'express'

const Product = require('../../mongo/models/products')
const logger = require('../../utils/logger')

const getProducts = async (req: Request, res: Response) => {
	try {
		logger('products-controller - getProducts()')

		const products = await Product.find()
			.select('title description price')
			.populate('user', 'username email data.age role')

		const result = { status: 'OK', data: products }

		res.send(result)

		logger('products-controller - getProducts() - result:', result)
	} catch (error) {
		res.status(500).send({
			status: 'ERROR',
			message: error.message
		})

		logger('products-controller - getProducts() - error:', error.message)
	}
}

const getProductsByUserId = async (req: Request, res: Response) => {
	try {
		logger(
			'products-controller - getProductsByUserId() - req.params:',
			req.params
		)

		const products = await Product.find({
			user: req.params.userId
		})

		const result = { status: 'OK', data: products }

		res.send(result)

		logger('products-controller - getProductsByUserId() - result:', result)
	} catch (error) {
		res.status(500).send({
			status: 'ERROR',
			message: error.message
		})

		logger(
			'products-controller - getProductsByUserId() - error:',
			error.message
		)
	}
}

const getProductsCheaperThan100 = async (req: Request, res: Response) => {
	try {
		logger('products-controller - getProductsCheaperThan100() ')

		const products = await Product.find({
			price: { $lt: 100 }
		})

		const result = { status: 'OK', data: products }

		res.send(result)

		logger(
			'products-controller - getProductsCheaperThan100() - result:',
			result
		)
	} catch (error) {
		res.status(500).send({
			status: 'ERROR',
			message: error.message
		})

		logger(
			'products-controller - getProductsCheaperThan100() - error:',
			error.message
		)
	}
}

const getProductsMoreExpensiveThan100 = async (req: Request, res: Response) => {
	try {
		logger('products-controller - getProductsMoreExpensiveThan100()')

		const products = await Product.find({
			price: { $gt: 100 }
		})

		const result = { status: 'OK', data: products }

		res.send(result)

		logger(
			'products-controller - getProductsMoreExpensiveThan100() - result:',
			result
		)
	} catch (error) {
		res.status(500).send({
			status: 'ERROR',
			message: error.message
		})

		logger(
			'products-controller - getProductsMoreExpensiveThan100() - error:',
			error.message
		)
	}
}

const createProduct = async (req: Request, res: Response) => {
	try {
		logger('products-controller - createProduct() - req.body:', req.body)

		const { title, description, price, images, userId } = req.body

		const product = await Product.create({
			title,
			description,
			price,
			images,
			user: userId
		})

		const result = { status: 'OK', data: product }

		res.send(result)

		logger('products-controller - createProduct() - result:', result)
	} catch (error) {
		if (error.code && error.code === 11000) {
			const result = {
				status: 'DUPLICATED_VALUES',
				message: error.keyValue
			}
			res.status(400).send(result)
			logger(result)
			return
		}
		res.status(500).send({
			status: 'ERROR',
			message: error.message
		})
		logger('products-controller - createProduct() - Error:', error.message)
	}
}

const deleteProduct = async (req: Request, res: Response) => {
	try {
		const { productId } = req.body

		logger('products-controller - deleteProduct() - productId:', productId)

		if (productId) {
			await Product.findByIdAndRemove(productId)
			res.send('Product deleted!')
			logger('products-controller - deleteProduct() - Product deleted!')
		} else {
			throw new Error('Missing param productId')
		}
	} catch (error) {
		res.status(500).send({ status: 'ERROR', message: error.message })
		logger('products-controller - createProduct() - Error:', error.message)
	}
}

module.exports = {
	getProducts,
	getProductsByUserId,
	getProductsCheaperThan100,
	getProductsMoreExpensiveThan100,
	createProduct,
	deleteProduct
}
