const express = require('express')
const router = express.Router()
const { verifyToken, localVariables } = require('../middlewares/auth')


const AuthController = require('../controllers/auth.controller')
const BazarController = require('../controllers/bazar.controller')
const ForumController = require('../controllers/forum.controller')

// Test route
router.get('/api/v1', (req, res) => {
  return res.status(200).json({ message: 'I am the test route!' })
})

// Auth routes
router.route('/api/v1/signup').post(AuthController.signup)
router.route('/api/v1/login').post(localVariables, AuthController.login)
router.route('/api/v1/verifyOTP').get(verifyToken, AuthController.verifyOTP)


// Bazar routes
router.route('/api/v1/allBazars').get(BazarController.getAllBazars)
router.route('/api/v1/:from/:to/allDistricts').get(BazarController.getAllDistricts)
router.route('/api/v1/bazars/:from/:to/:district').get(BazarController.searchByDistrict)
router.route('/api/v1/addBazar').post(verifyToken, BazarController.addBazar)


// Forum routes
router.route('/api/v1/createThread').post(verifyToken, ForumController.createThread)
router.route('/api/v1/threads').get(verifyToken, ForumController.getAllThreads)
router.route('/api/v1/threads/:threadId').get(verifyToken, ForumController.getSpecificThread)
router.route('/api/v1/comment').post(verifyToken, ForumController.createComment)


module.exports = router
