const express = require('express')
const router = express.Router()
const { verifyToken, localVariables } = require('../middlewares/auth')


const AuthController = require('../controllers/auth.controller')
const BazarController = require('../controllers/bazar.controller')
const PostController = require('../controllers/post.controller')
const ChatController = require('../controllers/chat.controller')
const MessageController = require('../controllers/message.controller')

// Test route
router.get('/api/v1', (req, res) => {
  return res.status(200).json({ message: 'I am the test route!' })
})

// Auth routes
router.route('/api/v1/signup').post(AuthController.signup)
router.route('/api/v1/login').post(localVariables, AuthController.login)
router.route('/api/v1/verifyOTP').get(verifyToken, AuthController.verifyOTP)
router.route('/api/v1/getProfile').get(verifyToken, AuthController.getProfile)


// Bazar routes
router.route('/api/v1/allBazars').get(BazarController.getAllBazars)
router.route('/api/v1/:from/:to/allDistricts').get(BazarController.getAllDistricts)
router.route('/api/v1/bazars/:from/:to/:district').get(BazarController.searchByDistrict)
router.route('/api/v1/addBazar').post(verifyToken, BazarController.addBazar)


// Post routes
router.route('/api/v1/:status/createThread').post(verifyToken, PostController.createThread)
router.route('/api/v1/:status/threads').get(verifyToken, PostController.getAllThreads)
router.route('/api/v1/threads/:threadId').get(verifyToken, PostController.getSpecificThread)
router.route('/api/v1/comment').post(verifyToken, PostController.createComment)


// Chat routes
router.route('/api/v1/chat').get(verifyToken, ChatController.fetchChats)
router.route('/api/v1/chat').post(verifyToken, ChatController.accessChat)
router.route('/api/v1/chat/group').post(verifyToken, ChatController.createGroupChat)
router.route('/api/v1/chat/rename').put(verifyToken, ChatController.renameGroup)
router.route('/api/v1/chat/groupadd').put(verifyToken, ChatController.addToGroup)
router.route('/api/v1/chat/groupremove').put(verifyToken, ChatController.removeFromGroup)


// Message routes
router.route('/api/v1/message/:chatId').get(verifyToken, MessageController.allMessages)
router.route('/api/v1/message').post(verifyToken, MessageController.sendMessage)


module.exports = router
