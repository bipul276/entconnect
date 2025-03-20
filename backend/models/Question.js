const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [String],
  correctAnswer: { type: String },
  explanation: String
});

module.exports = mongoose.model('Question', QuestionSchema);
