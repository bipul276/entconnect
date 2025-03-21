const express = require('express');
const router = express.Router();
const {
  sendChatRequest,
  getPendingChatRequests,
  respondChatRequest,
  getChats
} = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.post('/request', protect, sendChatRequest);
router.get('/requests', protect, getPendingChatRequests);
router.post('/respond', protect, respondChatRequest);
router.get('/', protect, getChats);

module.exports = router;
