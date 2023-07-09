const express = require('express')
const router = express.Router()
const { verifyToken, localVariables } = require('../middlewares/auth')


const AuthController = require('../controllers/auth.controller')
const BazarController = require('../controllers/bazar.controller')
const PostController = require('../controllers/post.controller')

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
router.route('/api/v1/allDistricts').get(BazarController.getAllDistricts)
router.route('/api/v1/bazars/:district').get(BazarController.searchByDistrict)
router.route('/api/v1/addBazar').post(verifyToken, BazarController.addBazar)


// Post routes
router.route('/api/v1/createThread/:status').post(verifyToken, PostController.createThread)
router.route('/api/v1/threads/:status').get(verifyToken, PostController.getAllThreads)
router.route('/api/v1/threads/:threadId').get(verifyToken, PostController.getSpecificThread)
router.route('/api/v1/comment').post(verifyToken, PostController.createComment)


// Group routes


module.exports = router
