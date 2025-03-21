const express = require('express');
const router = express.Router();
const { sendConnectionRequest, getConnections } = require('../controllers/connectionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, sendConnectionRequest);
router.get('/', protect, getConnections);

module.exports = router;
