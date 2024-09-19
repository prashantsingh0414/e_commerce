const express= require ('express');
const router = express.Router();
const productController =require('../controllers/productController');

router.route('/products')
.get(productController.getProducts)
.post(productController.createProducts)



router.route('/products/:id')
.delete(productController.deleteProducts)
.put(productController.updateProducts)




module.exports =router