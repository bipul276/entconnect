const Knowledge = require('../models/Knowledge');

exports.getKnowledge = async (req, res) => {
  try {
    const knowledge = await Knowledge.find();
    res.json(knowledge);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.createKnowledge = async (req, res) => {
  try {
    const newKnowledge = new Knowledge(req.body);
    const knowledge = await newKnowledge.save();
    res.json(knowledge);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
