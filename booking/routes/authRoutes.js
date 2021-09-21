const {Router} =require('express')
const authController = require('../controllers/authController')

const router = Router()

// trains add
router.post('/booking',authController.booking_post)

// trains get
router.get('/booking',authController.booking_get)

// deleted get_id

// trains get by pnr
router.get('/booking/:pnr',authController.booking_get_pnr1)
router.get('/booking/:adhaar/:pnr',authController.booking_get_pnr)

// trains delete
router.delete('/booking/:id',authController.booking_delete_id)

module.exports =router