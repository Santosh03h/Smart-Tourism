const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// ─── Security Middleware ───────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));

// ─── Rate Limiting ─────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// ─── Body Parser ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Logging ───────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/auth',            require('./routes/auth'));
app.use('/api/users',           require('./routes/users'));
app.use('/api/trips',           require('./routes/trips'));
app.use('/api/ai',              require('./routes/ai'));
app.use('/api/risk',            require('./routes/risk'));
app.use('/api/routes',          require('./routes/routeRoutes'));
app.use('/api/alerts',          require('./routes/alerts'));
app.use('/api/emergency',       require('./routes/emergency'));
app.use('/api/recommendations', require('./routes/recommendations'));
app.use('/api/weather',         require('./routes/weather'));
app.use('/api/admin',           require('./routes/admin'));

// ─── Health Check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'AI-Powered Smart Tourism & Safety Platform API is running',
    version: '1.0.0',
    demoMode: process.env.DEMO_MODE === 'true',
    timestamp: new Date().toISOString()
  });
});

// ─── Serve Frontend (Static React Build) ───────────────────────────────────────
const path = require('path');
const fs = require('fs');
const clientDistPath = path.join(__dirname, '../client/dist');

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    // If it's an unhandled API route, return 404 JSON instead of HTML
    if (req.originalUrl.startsWith('/api/')) {
      return res.status(404).json({ success: false, message: `API route ${req.originalUrl} not found` });
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  // ─── Root Route (when client is not built) ──────────────────────────────────
  app.get('/', (req, res) => {
    res.json({
      success: true,
      name: 'AI-Powered Smart Tourism & Safety Platform API',
      status: 'online',
      healthCheck: '/api/health',
      endpoints: {
        auth: '/api/auth',
        trips: '/api/trips',
        ai: '/api/ai',
        risk: '/api/risk',
        routes: '/api/routes',
        alerts: '/api/alerts',
        emergency: '/api/emergency',
        recommendations: '/api/recommendations',
        weather: '/api/weather',
        admin: '/api/admin'
      }
    });
  });

  // ─── 404 Handler ─────────────────────────────────────────────────────────────
  app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
  });
}

// ─── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ─── Database Connection ───────────────────────────────────────────────────────
mongoose.set('bufferCommands', false);
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.log('⚠️  No MONGO_URI provided — Running in DEMO / IN-MEMORY MODE (all features available)');
    process.env.DEMO_MODE = 'true';
    return;
  }
  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('⚠️  Falling back to DEMO / IN-MEMORY MODE (no database required)');
    process.env.DEMO_MODE = 'true';
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 API: http://localhost:${PORT}/api/health`);
    console.log(`🎭 Demo Mode: ${process.env.DEMO_MODE === 'true' || mongoose.connection.readyState !== 1 ? 'ON' : 'OFF'}`);
  });
});

module.exports = app;
