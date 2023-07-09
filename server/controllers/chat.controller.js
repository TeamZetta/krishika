const Chat = require('../models/chat.model')
const User = require('../models/user.model')


exports.fetchChats = async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user.userId } } })
            .populate('users', 'fullName address zipCode district')
            .populate('groupAdmin', 'fullName address zipCode district')
            .populate('latestMessage')
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: 'latestMessage.sender',
                    select: 'fullName address zipCode district'
                })

                res.status(200).send(results)
            })
    }
    catch (err) {
        res.status(500).json(err.message)
    }
}

exports.accessChat = async (req, res) => {
    const { userId } = req.body

    if (!userId) {
        return res.status(400).json({ message: 'UserId param not sent with request' })
    }

    var isChat = await Chat.find({
        $and: [
            { users: { $elemMatch: { $eq: req.user.userId } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate('users', 'fullName address zipCode district')
        .populate('latestMessage')

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'fullName address zipCode district'
    })

    if (isChat.length > 0) {
        res.status(200).json(isChat[0])
    }
    else {
        var chatData = {
            chatName: 'sender',
            users: [req.user._id, userId]
        }

        try {
            const createdChat = await Chat.create(chatData)

            const FullChat = await Chat.findOne({ _id: createdChat._id })
                .populate('users', 'fullName address zipCode district')

            res.status(200).json(FullChat)
        }
        catch (err) {
            res.status(400).json(err.message)
        }
    }
}

exports.createGroupChat = async (req, res) => {
    const { userId } = req.user
    if (!req.body.users || !req.body.name) {
        return res.status(400).json({ message: 'Please Fill all the Fields' })
    }

    let users = req.body.users
    users.push(userId)

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            groupAdmin: userId
        })

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate('users', 'fullName address zipCode district')
            .populate('groupAdmin', 'fullName address zipCode district')

        res.status(200).json(fullGroupChat)
    }
    catch (err) {
        res.status(400).json(err.message)
    }
}

exports.renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: chatName
        },
        {
            new: true
        }
    )
        .populate('users', 'fullName address zipCode district')
        .populate('groupAdmin', 'fullName address zipCode district')

    if (!updatedChat) {
        res.status(400).json('Chat not Found')
    }
    else {
        res.status(204).json(updatedChat)
    }
}

exports.addToGroup = async (req, res) => {
    const { chatId, userId } = req.body

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId }
        },
        { new: true }
    )
        .populate('users', 'fullName address zipCode district')
        .populate('groupAdmin', 'fullName address zipCode district')

    if (!added) {
        res.status(400).json('Chat not Found')
    }
    else {
        res.status(204).json(added)
    }
}

exports.removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId }
        },
        { new: true }
    )
        .populate('users', 'fullName address zipCode district')
        .populate('groupAdmin', 'fullName address zipCode district')

    if (!removed) {
        res.status(400).json('Chat not Found')
    }
    else {
        res.status(204).json(removed)
    }
}