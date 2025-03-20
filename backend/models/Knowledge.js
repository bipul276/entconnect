const mongoose = require('mongoose');

const KnowledgeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  category: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Knowledge', KnowledgeSchema);
