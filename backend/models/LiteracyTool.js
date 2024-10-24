const mongoose = require('mongoose');

const LiteracyToolSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  toolName: { type: String, required: true },
  progress: { type: Number, default: 0 },  // Track progress for each tool, percentage
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LiteracyTool', LiteracyToolSchema);
