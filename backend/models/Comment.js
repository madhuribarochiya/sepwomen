const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' },
});

module.exports = mongoose.model('Comment', CommentSchema);
