const Thread = require('../models/Thread');
const Comment = require('../models/Comment');

// Create thread
exports.createThread = async (req, res) => {
  const { title, category } = req.body;
  try {
    const thread = new Thread({ title, category, user: req.user.id });
    await thread.save();
    res.status(201).json(thread);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  const { text, threadId } = req.body;
  try {
    const comment = new Comment({ text, user: req.user.id, thread: threadId });
    await comment.save();
    const thread = await Thread.findById(threadId);
    thread.comments.push(comment);
    await thread.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all threads
exports.getThreads = async (req, res) => {
  try {
    const threads = await Thread.find().populate('comments').populate('user', 'name');
    res.json(threads);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
