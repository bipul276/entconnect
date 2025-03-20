// backend/controllers/connectionController.js
const User = require('../models/User');

exports.sendConnectionRequest = async (req, res) => {
  const { targetUserId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    // For simplicity, add connection directly (no approval)
    if (!user.connections.includes(targetUserId)) {
      user.connections.push(targetUserId);
      await user.save();
    }
    res.json({ message: 'Connection added' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getConnections = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('connections', 'username email');
    res.json(user.connections);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
