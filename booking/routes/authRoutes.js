const {Router} =require('express')
const authController = require('../controllers/authController')

const router = Router()

// trains add
router.post('/booking',authController.booking_post)

// trains get
router.get('/booking',authController.booking_get)

// trains get by id
router.get('/booking/:id',authController.booking_get_id)

// trains delete
router.delete('/booking/:id',authController.booking_delete_id)

module.exports =router