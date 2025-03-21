const ChatRequest = require('../models/ChatRequest');
const Chat = require('../models/Chat');

/**
 * Send a chat request from a user to a mentor.
 */
exports.sendChatRequest = async (req, res) => {
  const { receiverId, openingMessage } = req.body;
  try {
    const chatRequest = await ChatRequest.create({
      sender: req.user.id,
      receiver: receiverId,
      openingMessage,
      status: 'pending'
    });
    res.json(chatRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error sending chat request' });
  }
};

/**
 * Get pending chat requests (for mentors only).
 */
exports.getPendingChatRequests = async (req, res) => {
  try {
    const requests = await ChatRequest.find({
      receiver: req.user.id,
      status: 'pending'
    }).populate('sender', 'username email');
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching chat requests' });
  }
};

/**
 * Mentor responds to a chat request (accept or reject).
 * If accepted, a Chat is created.
 */
exports.respondChatRequest = async (req, res) => {
  const { requestId, action } = req.body;
  try {
    const chatRequest = await ChatRequest.findById(requestId);
    if (!chatRequest) return res.status(404).json({ message: 'Chat request not found' });
    chatRequest.status = action;
    await chatRequest.save();

    if (action === 'accepted') {
      const chat = await Chat.create({
        participants: [chatRequest.sender, chatRequest.receiver],
        messages: [{
          sender: chatRequest.sender,
          text: chatRequest.openingMessage,
          sentAt: new Date()
        }]
      });
      return res.json({ chatRequest, chat });
    }
    res.json(chatRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error responding to chat request' });
  }
};

/**
 * Get accepted chats for the logged-in user.
 */
exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.user.id })
      .populate('participants', 'username email');
    res.json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching chats' });
  }
};
