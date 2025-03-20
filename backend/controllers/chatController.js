// backend/controllers/chatController.js
const ChatRequest = require('../models/ChatRequest');
const Chat = require('../models/Chat');

exports.sendChatRequest = async (req, res) => {
  const { receiverId, openingMessage } = req.body;
  try {
    const chatRequest = await ChatRequest.create({
      sender: req.user.id,
      receiver: receiverId,
      openingMessage
    });
    res.json(chatRequest);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.respondChatRequest = async (req, res) => {
  const { requestId, action } = req.body; // action: 'accepted' or 'rejected'
  try {
    const chatRequest = await ChatRequest.findById(requestId);
    if (!chatRequest) return res.status(404).json({ message: 'Request not found' });
    chatRequest.status = action;
    await chatRequest.save();
    // If accepted, create a Chat document
    if (action === 'accepted') {
      const chat = await Chat.create({
        participants: [chatRequest.sender, chatRequest.receiver],
        messages: [{
          sender: chatRequest.sender,
          text: chatRequest.openingMessage
        }]
      });
      return res.json({ chatRequest, chat });
    }
    res.json(chatRequest);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.user.id }).populate('participants', 'username email');
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
