const Network = require('../models/Network');

exports.getNetworks = async (req, res) => {
  try {
    const networks = await Network.find();
    res.json(networks);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.createNetwork = async (req, res) => {
  try {
    const newNetwork = new Network(req.body);
    const network = await newNetwork.save();
    res.json(network);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
