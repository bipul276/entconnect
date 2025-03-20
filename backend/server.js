require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define API routes
app.use('/api/mentors', require('./routes/mentors'));
app.use('/api/networks', require('./routes/networks'));
app.use('/api/knowledge', require('./routes/knowledge'));

// Use PORT from .env or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
