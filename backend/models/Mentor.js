const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  expertise: [String],
  contact: String,
  imageUrl: String
});

module.exports = mongoose.model('Mentor', MentorSchema);
