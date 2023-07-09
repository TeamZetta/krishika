const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const { JWT_SECRET } = require("../config")
const { generateOTP, generateUserName } = require("../utils")
const sendSMS = require("../utils/sms")


exports.login = async (req, res) => {
  try {
    const { phoneNumber } = req.body
    const userFound = await User.findOne({ phoneNumber })
    if (userFound) {
      // OTP generation
      const otp = generateOTP(4)
      await sendSMS(phoneNumber, otp)

      req.app.locals.OTP = otp

      /* Create JWT token */
      const accessToken = jwt.sign(
        {
          userId: userFound._id
        },
        JWT_SECRET,
        { expiresIn: "1d" }
      )

      return res.status(200).json(accessToken)
    }
    else return res.status(409).json({ message: "Phone number not registered" })
  }
  catch (e) {
    return res.status(422).json({ error: e })
  }
}


exports.verifyOTP = async (req, res) => {
  const { code } = req.query
  const { userId } = req.user
  console.log(req.app.locals.OTP)
  
  try {
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
      req.app.locals.OTP = null
      const user = await User.findById(userId)

      return res.status(200).json(user)
    }
    else {
      return res.status(400).json({ error: 'Invalid OTP' })
    }
  }
  catch (err) {
    return res.status(500).json(err)
  }
}


exports.signup = async (req, res) => {
  try {
    const {
      phoneNumber,
      fullName,
      address,
      zipCode,
      district,
      role,
      landSize,
      email,
      prefLang,
    } = req.body

    const userFound = await User.findOne({ phoneNumber })

    if (userFound)
      return res.status(422).json({ message: "User already exists!" })
    else {
      const user = new User({
        userName: generateUserName(fullName),
        phoneNumber,
        fullName,
        address,
        zipCode,
        email,
        district,
        landSize,
        role,
        lang: prefLang,
      })

      // OTP generation
      const otp = generateOTP(4)
      await sendSMS(phoneNumber, otp) // To be checked at client side

      await user.save()
      return res.status(200).json({ user, otp })
    }
  } catch (e) {
    console.log("@signup", e)
    return res.status(422).json({ error: e })
  }
}
