const {Router} =require('express')
const authController = require('../controllers/authController')
const cors = require('cors')

const router = Router()

// trains add
router.post('/trains',cors(),authController.train_post)

// trains get
router.get('/trains',cors(),authController.train_get)

// trains get by id
router.get('/trains/:id',cors(),authController.train_get_id)

// trains get by id
router.get('/trains/:to/:from',cors(),authController.train_get_search)

// trains delete
router.delete('/trains/:id',cors(),authController.train_delete_id)

module.exports =router