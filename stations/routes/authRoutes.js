const {Router} =require('express')
const authController = require('../controllers/authController')

const router = Router()

// trains add
router.post('/stations',authController.station_post)

// trains get
router.get('/stations',authController.station_get)

// trains get by id
router.get('/stations/:id',authController.station_get_id)

// trains delete
router.delete('/stations/:id',authController.station_delete_id)

module.exports =router