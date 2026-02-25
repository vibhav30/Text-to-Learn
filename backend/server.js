const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
dotenv.config();

const app = express();

app.use(helmet());

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

const genLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 15 generation requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Generation rate limit exceeded. Please try again later.' }
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in the environment variables.');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });

const courseRoutes = require('./routes/courseRoutes');
const { searchVideo } = require('./services/youtubeService');

app.use('/api', apiLimiter);
app.use('/api/generate-course', genLimiter);
app.use('/api/generate-lesson', genLimiter);
app.use('/api', courseRoutes);

app.get('/api/youtube', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    const videoId = await searchVideo(query);
    if (videoId) {
      return res.status(200).json({ videoId });
    } else {
      return res.status(404).json({ error: 'No video found' });
    }
  } catch (error) {
    console.error('YouTube search error:', error.stack);
    return res.status(500).json({ error: 'Internal server error while searching YouTube' });
  }
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Invalid or missing authentication token.' });
  }
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ error: 'An unexpected error occurred on the server.' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
