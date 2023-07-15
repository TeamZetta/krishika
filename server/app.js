const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { CLIENT_URL } = require("./config")

const app = express()

// middlewares
app.use(cors(
    {
        origin: CLIENT_URL,
        credentials: true
    }
))
app.use(morgan('tiny'))
app.use(express.json({ limit: '5mb' }))

// routes
app.use(require("./routes"))

module.exports = app
