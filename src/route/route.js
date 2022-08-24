const express = require('express')
const router = express.Router();
const {products} = require('../controller/products')

router.post('/product', products)

module.exports = router