const LiteracyTool = require('../models/LiteracyTool');

// Get all financial literacy tools
exports.getLiteracyTools = async (req, res) => {
  try {
    const tools = await LiteracyTool.find({ user: req.user.id });
    res.json(tools);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new tool progress
exports.createTool = async (req, res) => {
  const { toolName, progress } = req.body;
  try {
    const tool = new LiteracyTool({
      user: req.user.id,
      toolName,
      progress,
    });
    await tool.save();
    res.status(201).json(tool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update progress for a specific tool
exports.updateToolProgress = async (req, res) => {
  const { id, progress } = req.body;
  try {
    const tool = await LiteracyTool.findById(id);
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    tool.progress = progress;
    await tool.save();
    res.json(tool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
