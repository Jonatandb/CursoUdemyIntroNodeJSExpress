const express = require('express')

const productsController = require('../../controlles/v1/products-controller')

const router = express.Router()

router.post('/create', productsController.createProduct)
router.post('/delete', productsController.deleteProduct)
router.get('/get-all', productsController.getProducts)
router.get('/get-by-user/:userId', productsController.getProductsByUserId)
router.get('/getCheaperThan100', productsController.getProductsCheaperThan100)
router.get('/getGreaterThan100', productsController.getProductsGreaterThan100)

module.exports = router
