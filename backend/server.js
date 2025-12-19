const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const { notFound, errorHandler } = require('./src/middleware/errorMiddleware');

// Import all route files
const authRoutes = require('./src/Routes/authRoutes');
const transactionRoutes = require('./src/Routes/transactionRoutes');
const recommendationRoutes = require('./src/Routes/recommendations');
const creditRoutes = require('./src/routes/creditRoutes');
const dashboardRoutes = require('./src/Routes/dashboardRoutes');
const farmRoutes = require('./src/Routes/farmRoutes');
const purchaseRoutes = require('./src/Routes/purchaseRoutes');
const adminRoutes = require('./src/Routes/adminRoutes'); // ADD THIS IMPORT

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ========== MIDDLEWARE ==========
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== ROUTES ==========
// Public routes
app.use('/api/users', authRoutes);

// Protected routes (require authentication)
app.use('/api/transactions', transactionRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/farms', farmRoutes);
app.use('/api/purchase-requests', purchaseRoutes);
app.use('/api/admin', adminRoutes); // ADD THIS LINE

// ========== UTILITY ROUTES ==========
// Welcome route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to EBD API',
    version: '1.0.0',
    description: 'Educational Business Dashboard API',
    endpoints: {
      auth: '/api/users',
      transactions: '/api/transactions',
      credits: '/api/credits',
      recommendations: '/api/recommendations',
      dashboard: '/api/dashboard',
      farms: '/api/farms',
      purchaseRequests: '/api/purchase-requests',
      admin: '/api/admin' // ADD THIS LINE
    },
    documentation: '/api-docs'
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'EBD API',
    version: '1.0.0',
    database: 'Connected',
    uptime: process.uptime()
  });
});

// API Documentation route
app.get('/api-docs', (req, res) => {
  res.json({
    documentation: 'API Documentation',
    baseURL: 'http://localhost:5000/api',
    
    // Authentication
    auth: {
      register: 'POST /api/users/register',
      login: 'POST /api/users/login',
      getProfile: 'GET /api/users/profile'
    },
    
    // Purchase Requests
    purchaseRequests: {
      create: 'POST /api/purchase-requests (student)',
      getAll: 'GET /api/purchase-requests (admin/company)',
      getMyRequests: 'GET /api/purchase-requests/my-requests (student)',
      getById: 'GET /api/purchase-requests/:id',
      approve: 'PUT /api/purchase-requests/:id/approve (admin/company)',
      reject: 'PUT /api/purchase-requests/:id/reject (admin/company)',
      cancel: 'PUT /api/purchase-requests/:id/cancel (student)',
      stats: 'GET /api/purchase-requests/stats/overview (admin)'
    },
    
    // Admin Panel
    admin: {
      stats: 'GET /api/admin/stats',
      users: 'GET /api/admin/users',
      userById: 'GET /api/admin/users/:id',
      updateUser: 'PUT /api/admin/users/:id',
      deleteUser: 'DELETE /api/admin/users/:id',
      students: 'GET /api/admin/students',
      activity: 'GET /api/admin/activity'
    },
    
    // Other endpoints
    credits: {
      getCredits: 'GET /api/credits',
      addCredits: 'POST /api/credits/add'
    },
    
    transactions: {
      getAll: 'GET /api/transactions',
      getById: 'GET /api/transactions/:id'
    },
    
    recommendations: {
      getAll: 'GET /api/recommendations',
      courses: 'GET /api/recommendations/courses'
    },
    
    dashboard: {
      overview: 'GET /api/dashboard',
      studentStats: 'GET /api/dashboard/student-stats'
    }
  });
});

// Test route for checking server status
app.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running correctly',
    time: new Date().toISOString(),
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'development'
  });
});

// ========== ERROR HANDLING ==========
// 404 Not Found Middleware
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

// ========== START SERVER ==========
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log('='.repeat(60));
  console.log('📡 Available Endpoints:');
  console.log('   🔐 Auth:        /api/users');
  console.log('   💰 Transactions: /api/transactions');
  console.log('   💳 Credits:      /api/credits');
  console.log('   🤖 Recommendations: /api/recommendations');
  console.log('   📊 Dashboard:    /api/dashboard');
  console.log('   🏢 Farms:        /api/farms');
  console.log('   🛒 Purchase Requests: /api/purchase-requests');
  console.log('   👑 Admin Panel:   /api/admin'); // ADD THIS LINE
  console.log('='.repeat(60));
  console.log(`🔗 Server URL: http://localhost:${PORT}`);
  console.log(`📚 API Docs:   http://localhost:${PORT}/api-docs`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
  console.log('='.repeat(60));
  console.log('📝 Logs will appear below...');
  console.log('-'.repeat(60));
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
    console.log('Try one of these solutions:');
    console.log('1. Change PORT in .env file');
    console.log('2. Run: kill -9 $(lsof -t -i:5000)');
    console.log('3. Restart your computer');
  } else {
    console.error('❌ Server error:', error);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

module.exports = app; // For testing purposes