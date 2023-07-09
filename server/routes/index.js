const express = require('express')
const router = express.Router()


const AuthController = require("../controllers/auth.controller")

// Test route
router.get('/api/v1', (req, res) => {
  return res.status(200).json({ message: 'I am the test route!' })
})

// Auth routes
router.post("/api/v1/signup", AuthController.signup)
router.post("/api/v1/login", AuthController.login)


module.exports = router
