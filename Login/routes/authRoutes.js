const {Router} =require('express')
const authController = require('../controllers/authController')

const router = Router()

// sends back signup-view
router.get('/signup',authController.signup_get)

// sends back signup-view
router.post('/signup',authController.signup_post)

// sends back signup-view
router.get('/login',authController.login_get)

// sends back signup-view
router.post('/login',authController.login_post)

module.exports =router