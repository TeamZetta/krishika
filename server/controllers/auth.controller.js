const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const { JWT_SECRET } = require("../config")
const { generateOTP, generateUserName } = require("../utils")
const { sendSMS } = require("../utils/sms")

exports.login = async (req, res) => {
  try {
    const { phoneNumber } = req.body
    const userFound = await User.findOne({ phoneNumber })
    if (userFound) {
      // OTP generation
      const otp = generateOTP(4)
      await sendSMS(phoneNumber, otp)

      /* Create JWT token */
      const accessToken = jwt.sign(
        {
          userId: userFound._id,
          userName: userFound.userName,
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      )

    

      return res.status(200).json({ user: userFound, otp, accessToken }) 
    } else res.status(409).json({ message: "phone number not registered" })
  } catch (e) {
    console.log("@login", e)
    return res.status(422).json({ error: e })
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
