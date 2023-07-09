const User = require('../models/user.model')
const Chat = require('../models/chat.model')
const Message = require('../models/message.model')


exports.sendMessage = async (req, res) => {
    const { content, chatId } = req.body

    if (!content || !chatId) {
        console.log('Invalid data passed into request')
        return res.status(400)
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }

    try {
        var message = await Message.create(newMessage)

        message = await message.populate('sender', 'fullName address zipCode district')
        message = await message.populate('chat')
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'fullName address zipCode district'
        })

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message
        })

        res.status(201).json(message)
    }
    catch (err) {
        res.status(400).json(err.message)
    }
}


exports.allMessages = async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate('sender', 'fullName address zipCode district')
            .populate('chat')

        res.status(200).json(messages)
    }
    catch (err) {
        res.status(400).json(err.message)
    }
}