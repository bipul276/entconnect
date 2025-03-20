const express = require('express');
const router = express.Router();
const networkController = require('../controllers/networkController');

// GET all networks
router.get('/', networkController.getNetworks);

// POST create a new network
router.post('/', networkController.createNetwork);

module.exports = router;
