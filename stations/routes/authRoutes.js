const {Router} =require('express')
const authController = require('../controllers/authController')
const cors = require('cors')

const router = Router()

// trains add
router.post('/stations',authController.station_post)

// trains get
router.get('/stations',authController.station_get)

// trains delete
router.delete('/stations/:id',authController.station_delete_id)

module.exports =router