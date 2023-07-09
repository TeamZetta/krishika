const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    chatName: {
        type: String,
        trim: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.__v
            }
        },
        timestamps: true
    }
)

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat