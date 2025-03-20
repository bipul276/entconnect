// backend/routes/news.js
const express = require('express');
const router = express.Router();
const { getNews } = require('../controllers/newsController');

router.get('/', getNews);

module.exports = router;
