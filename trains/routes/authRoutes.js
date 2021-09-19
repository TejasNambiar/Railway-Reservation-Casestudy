const {Router} =require('express')
const authController = require('../controllers/authController')
const cors = require('cors')

const router = Router()

// trains add
router.post('/trains',authController.train_post)

// trains get
router.get('/trains',authController.train_get)

// trains get by id
router.get('/trains/:id',authController.train_get_id)

// trains get by id
router.get('/trains/:to/:from',authController.train_get_search)

// trains delete
router.delete('/trains/:id',authController.train_delete_id)

module.exports =router