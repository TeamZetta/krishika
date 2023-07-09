const express = require('express')
const router = express.Router()

// Test route
router.get('/', (req, res) => {
  return res.status(200).json({ message: 'I am the test-route!' })
})

module.exports = router
