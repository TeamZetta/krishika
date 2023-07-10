const Post = require("../models/post.model")
const Comment = require("../models/comment.model")

exports.createThread = async (req, res) => {
  const { thread } = req.body
  if (!thread || thread.trim() === "")
    return res.status(400).json({ message: "Provide a thread" })

  const { userId } = req.user
  const { status } = req.params

  try {
    const newThread = await Post.create({
      thread,
      author: userId,
      status,
    })

    const fullThread = await Post.findOne({ _id: newThread._id }).populate(
      "author",
      "fullName userName role vote"
    )

    return res.status(200).json(fullThread)
  } catch (err) {
    return res.status(500).json(err)
  }
}


exports.deleteThread = async (req, res) => {
  const { threadId } = req.body
  const { userId } = req.user
  try {
    const threadToBeDeleted = await Post.deleteOne({
      $and: [
        { _id: threadId },
        { author: userId }
      ]
    })

    res.status(202).json(threadToBeDeleted)
  }
  catch (err) {
    res.status(500).json(err)
  }
}


exports.getSpecificThread = async (req, res) => {
  const { threadId } = req.params

  try {
    const thread = await Post.findById(threadId)
      .populate("author", "fullName userName role vote")
      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "user",
          model: "User",
          select: "fullName userName role vote",
        },
      })

    return res.status(200).json(thread)
  } catch (err) {
    return res.status(500).json(err)
  }
}

/** Have to implement pagination here */
exports.getAllThreads = async (req, res) => {
  const { status } = req.params

  try {
    const threads = await Post.find({ status })
      .populate("author", "fullName userName role vote")
      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "user",
          model: "User",
          select: "fullName userName role vote",
        },
      })

    return res.status(200).json(threads.reverse())
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.createComment = async (req, res) => {
  const { content, threadId } = req.body
  if (!content || content.trim() === "")
    return res.status(400).json({ message: "No content provided" })

  const { userId } = req.user

  try {
    const threadExists = await Post.exists({ _id: threadId })

    if (!threadExists) {
      return res.status(404).json({ message: "Thread not found" })
    } else {
      const newComment = await Comment.create({
        content,
        user: userId,
        threadId,
      })

      const updatedThread = await Post.findByIdAndUpdate(
        threadId,
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      )

      return res.status(200).json(updatedThread)
    }
  } catch (err) {
    return res.status(500).json(err)
  }
}
