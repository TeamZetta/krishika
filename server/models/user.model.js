const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    zipCode: { type: Number, required: true },
    email: { type: String, unique: true },
    district: { type: String, required: true },
    landSize: { type: String, required: true },
    role: { type: String, enum: ["Farmer", "Expert"], default: "Farmer" },
    lang: { type: String, enum: ["en", "bn"] },
    vote: { type: Number, default: 0 },
    admin: { type: Boolean, default: false },
    crop: { type: Number, default: 0 }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.createdAt
        delete ret.updatedAt
        delete ret.__v
      }
    }
  }
)

const User = mongoose.model("User", userSchema)

module.exports = User
