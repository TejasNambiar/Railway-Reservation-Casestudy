const {Router} =require('express')
const authController = require('../controllers/authController')

const router = Router()

// trains add
router.post('/trains',authController.train_post)

// trains get
router.get('/trains',authController.train_get)

// trains get by id
router.get('/trains/:id',authController.train_get_id)

// trains delete
router.delete('/trains/:id',authController.train_delete_id)

module.exports =router