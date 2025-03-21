const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  content:     { type: String },
  url:         { type: String },
  publishedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', NewsSchema);
