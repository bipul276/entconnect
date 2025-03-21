
const axios = require('axios');

exports.getTechNews = async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        category: 'technology',
        apiKey: process.env.NEWS_API_KEY,
        language: 'en',
        country: 'us'
      }
    });
    res.json(response.data.articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching tech news' });
  }
};
