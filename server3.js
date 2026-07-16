
# File 3: server.js - Main entry point
server_js = '''const express = require('express');
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

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/glimr')
  .then(() => logger.info('Connected to MongoDB - Mia\\'s memory is online'))
  .catch(err => logger.error('MongoDB connection failed:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', authenticateToken, chatRoutes);
app.use('/api/memory', authenticateToken, memoryRoutes);
app.use('/api/character', authenticateToken, characterRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    companion: 'Mia is awake',
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong. Mia is confused.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Mia is going to sleep...');
  mongoose.connection.close(false, () => {
    logger.info('MongoDB connection closed.');
    process.exit(0);
  });
});

app.listen(PORT, () => {
  logger.info(`GLIMR Companion Engine running on port ${PORT}`);
  logger.info('Mia is ready to listen...');
});

module.exports = app;
'''

with open(f"{output_dir}/server.js", "w") as f:
    f.write(server_js)

print("server.js created")
