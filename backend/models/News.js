const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  url: String,
  publishedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', NewsSchema);
