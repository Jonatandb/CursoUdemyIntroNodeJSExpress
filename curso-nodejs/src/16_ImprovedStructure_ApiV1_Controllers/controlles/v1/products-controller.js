const getProducts = (req, res) => {
	console.log('products-controller - getProducts()')
	res.send([
		{ id: 1, name: 'React application' },
		{ id: 2, name: 'C# application' }
	])
}

const createProduct = (req, res) => {
	console.log('products-controller - createProduct()')
	res.send('Product created!')
}

const deleteProduct = (req, res) => {
	console.log('products-controller - deleteProduct()')
	res.send('Product deleted!')
}

module.exports = {
	getProducts,
	createProduct,
	deleteProduct
}
