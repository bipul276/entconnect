const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController'); // ✅ Ensure correct path

// Ensure these functions exist in mentorController.js
router.get('/', mentorController.getMentors);
router.get('/:id', mentorController.getMentorById);
router.post('/', mentorController.createMentor);

module.exports = router;
