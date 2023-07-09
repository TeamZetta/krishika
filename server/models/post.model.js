const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    postImg: { type: String },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: { type: Number, default: 0 },
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

const Post = mongoose.model("Post", postSchema)

module.exports = Post
