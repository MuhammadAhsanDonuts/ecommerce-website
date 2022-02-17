const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/register', userController.register); // register user
router.get('/refreshtoken', userController.refreshToken); // refresh token




module.exports = router;