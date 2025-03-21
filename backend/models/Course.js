const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  content:     { type: String },
  mentor:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
