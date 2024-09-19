const express= require ('express');
const categoryController = require('../controllers/categoryController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

const router = express.Router();


router.route('/category')
.get(categoryController.getCategories)
.post(auth,authAdmin,categoryController.createCategory)


router.route('/category/:id')
.delete(auth,authAdmin,categoryController.deleteCategory)
.put(auth,authAdmin,categoryController.updateCategory)


module.exports =router;