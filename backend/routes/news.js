const express = require('express');
const router = express.Router();
const { getTechNews } = require('../controllers/newsController');

router.get('/', getTechNews);

module.exports = router;
