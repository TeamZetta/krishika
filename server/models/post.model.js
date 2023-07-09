const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    thread: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    status: {
        type: String,
        enum: ['FEED', 'FORUM']
    }
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

const Post = mongoose.model('Post', postSchema)

module.exports = Post