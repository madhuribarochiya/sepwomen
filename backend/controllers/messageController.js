const Message = require('../models/Message');

// Get messages for a mentor
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.params.mentorId }).populate('sender', 'name');
    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Send a new message
exports.sendMessage = async (req, res) => {
  const { text } = req.body;
  try {
    const message = new Message({
      text,
      sender: req.user.id,
      recipient: req.params.mentorId,
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
