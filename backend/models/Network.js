const mongoose = require('mongoose');

const NetworkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  website: String
});

module.exports = mongoose.model('Network', NetworkSchema);
