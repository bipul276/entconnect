const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  const { title, description, content } = req.body;
  try {
    const course = await Course.create({
      title,
      description,
      content,
      mentor: req.user.id
    });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('mentor', 'username profile');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
