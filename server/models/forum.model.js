const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema({
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
    }]
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

const Forum = mongoose.model('Forum', forumSchema)

module.exports = Forum