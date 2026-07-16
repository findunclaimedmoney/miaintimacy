const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const logger = require('./src/utils/logger');
const authRoutes = require('./src/routes/auth');
const chatRoutes = require('./src/routes/chat');
const memoryRoutes = require('./src/routes/memory');
const characterRoutes = require('./src/routes/character');
const { authenticateToken } = require('./src/middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://glimr.com.au', 'https://www.glimr.com.au'] 
    : '*',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: { error: 'Too many requests. Mia needs a break too.' }
});
app.use(limiter);

// Add your routes here
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/memory', memoryRoutes);
app.use('/character', characterRoutes);

app.listen(PORT, () => {
  console.log(`Mia is listening on port ${PORT}`);
});
