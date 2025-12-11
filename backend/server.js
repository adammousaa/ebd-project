const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
<<<<<<< HEAD
const authRoutes = require('./src/routes/authRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');
=======
const authRoutes = require('./src/Routes/authRoutes');
const transactionRoutes = require('./src/Routes/transactionRoutes');
const recommendationRoutes = require('./src/Routes/recommendations'); // check folder & file
>>>>>>> 0d1b5e4 (Completed backend setup)
const { notFound, errorHandler } = require('./src/middleware/errorMiddleware');
const creditRoutes = require("./routes/creditRoutes");


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
<<<<<<< HEAD
app.use('/api/credits', creditRoutes);

=======
app.use('/api/recommendations', recommendationRoutes);
>>>>>>> 0d1b5e4 (Completed backend setup)

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EBD API' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
<<<<<<< HEAD


=======
>>>>>>> 0d1b5e4 (Completed backend setup)
