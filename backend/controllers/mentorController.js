const Mentor = require('../models/Mentor');

exports.getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createMentor = async (req, res) => {
  try {
    const newMentor = new Mentor(req.body);
    const mentor = await newMentor.save();
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
