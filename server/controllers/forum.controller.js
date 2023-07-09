const Forum = require("../models/forum.model")
const Comment = require("../models/comment.model")


exports.createThread = async (req, res) => {
    const { thread } = req.body
    if (!thread || thread === '') return res.status(400).json({ message: "Provide a thread" })

    const { userId } = req.user

    try {
        const newThread = await Forum.create({
            thread,
            author: userId,
        })

        const fullThread = await Forum.findOne({ _id: newThread._id })
            .populate('author', 'fullName role vote')

        return res.status(200).json(fullThread)
    }
    catch (err) {
        return res.status(500).json(err)
    }
}


exports.getSpecificThread = async (req, res) => {
    const { threadId } = req.params

    try {
        const thread = await Forum.findById(threadId)
            .populate('author', 'fullName role vote')
            .populate({
                path: 'comments',
                model: 'Comment',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'fullName role vote'
                }
            })

        return res.status(200).json(thread)
    }
    catch (err) {
        return res.status(500).json(err)
    }
}


/** Have to implement pagination here */
exports.getAllThreads = async (req, res) => {
    try {
        const threads = await Forum.find()
            .populate('author', 'fullName role vote')
            .populate({
                path: 'comments',
                model: 'Comment',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'fullName role vote'
                }
            })


        return res.status(200).json(threads)
    }
    catch (err) {
        return res.status(500).json(err)
    }
}



exports.createComment = async (req, res) => {
    const { content, threadId } = req.body
    if (!content || content === '') return res.status(400).json({ message: "No content provided" })

    const { userId } = req.user

    try {
        const threadExists = await Forum.exists({ _id: threadId })

        if (!threadExists) {
            return res.status(404).json({ message: 'Thread not found' })
        }
        else {
            const newComment = await Comment.create({
                content,
                user: userId,
                threadId
            })

            const updatedThread = await Forum.findByIdAndUpdate(threadId, {
                $push: { comments: newComment._id }
            }, { new: true })

            return res.status(200).json(updatedThread)
        }
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

