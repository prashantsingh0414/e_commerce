const express= require ('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth')
const router = express.Router();


router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/logout',userController.logout);
router.get('/info',auth,userController.getUser);
router.get('/refresh_token',userController.refreshtoken);

module.exports =router;