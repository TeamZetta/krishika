const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    threadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
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

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment