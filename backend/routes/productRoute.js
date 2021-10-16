const express = require('express');
const { getAllProduct, getOneProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

router.route('/products').get(getAllProduct);

router.route('/product/new').post(createProduct);

router.route('/product/:id').get(getOneProduct).put(updateProduct).delete(deleteProduct);



module.exports = router;