import express from 'express'

const productsCtrl = require('../../controlles/v1/products-controller')

const router = express.Router()

router.post('/create', productsCtrl.createProduct)
router.post('/delete', productsCtrl.deleteProduct)
router.get('/get-all', productsCtrl.getProducts)
router.get('/get-by-user/:userId', productsCtrl.getProductsByUserId)
router.get('/getCheaperThan100', productsCtrl.getProductsCheaperThan100)
router.get(
	'/getMoreExpensiveThan100',
	productsCtrl.getProductsMoreExpensiveThan100
)

module.exports = router
