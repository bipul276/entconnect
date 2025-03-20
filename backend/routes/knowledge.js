const express = require('express');
const router = express.Router();
const knowledgeController = require('../controllers/knowledgeController');

// GET all knowledge articles
router.get('/', knowledgeController.getKnowledge);

// POST create a new article
router.post('/', knowledgeController.createKnowledge);

module.exports = router;
