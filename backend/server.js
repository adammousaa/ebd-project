const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/Routes/authRoutes');
const transactionRoutes = require('./src/Routes/transactionRoutes');
const recommendationRoutes = require('./src/Routes/recommendations');
const creditRoutes = require('./src/routes/creditRoutes');
const dashboardRoutes = require('./src/Routes/dashboardRoutes');
const farmRoutes = require('./src/Routes/farmRoutes');
const purchaseRoutes = require('./src/Routes/purchaseRoutes'); // ADD THIS IMPORT
const { notFound, errorHandler } = require('./src/middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/farms', farmRoutes);
app.use('/api/purchase-requests', purchaseRoutes); // ADD THIS LINE

// Welcome route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to EBD API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      transactions: '/api/transactions',
      credits: '/api/credits',
      recommendations: '/api/recommendations',
      dashboard: '/api/dashboard',
      farms: '/api/farms',
      purchaseRequests: '/api/purchase-requests'
    }
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'EBD API',
    version: '1.0.0'
  });
});

// API Documentation route
app.get('/api-docs', (req, res) => {
  res.json({
    documentation: 'API Documentation',
    purchaseRequests: {
      create: 'POST /api/purchase-requests',
      getAll: 'GET /api/purchase-requests (admin/company)',
      getMyRequests: 'GET /api/purchase-requests/my-requests (student)',
      getById: 'GET /api/purchase-requests/:id',
      approve: 'PUT /api/purchase-requests/:id/approve (admin/company)',
      reject: 'PUT /api/purchase-requests/:id/reject (admin/company)',
      cancel: 'PUT /api/purchase-requests/:id/cancel (student)',
      stats: 'GET /api/purchase-requests/stats/overview (admin)'
    }
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log('Available endpoints:');
  console.log('  • /api/users');
  console.log('  • /api/transactions');
  console.log('  • /api/credits');
  console.log('  • /api/recommendations');
  console.log('  • /api/dashboard');
  console.log('  • /api/farms');
  console.log('  • /api/purchase-requests'); // ADD THIS LINE
  console.log(`➡️  Server URL: http://localhost:${PORT}`);
});