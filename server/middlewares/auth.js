const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

const verifyToken = async (req, res, next) => {
    try {
        // access authorization header to validate request
        const token = req.headers.authorization.split(' ')[1]

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) return res.status(498).json('Token is not valid')
            req.user = user

            next()
        })
    }
    catch (error) {
        return res.status(401).json({ error: 'Authentication Failed' })
    }
}


const localVariables = (req, res, next) => {
    req.app.locals = {
        OTP: null
    }
    next()
}


module.exports = { verifyToken, localVariables }
