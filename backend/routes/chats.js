// backend/routes/chats.js
const express = require('express');
const router = express.Router();
const { sendChatRequest, respondChatRequest, getChats } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.post('/request', protect, sendChatRequest);
router.post('/respond', protect, respondChatRequest);
router.get('/', protect, getChats);

module.exports = router;
