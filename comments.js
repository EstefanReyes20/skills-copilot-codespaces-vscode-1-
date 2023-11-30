// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
// Create express app
const app = express();
// Import routes
const comments = require('./routes/comments');
const users = require('./routes/users');
// Import middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
// Import db connection
const connectDB = require('./config/db');
// Import env variables
require('dotenv').config();

// Connect to DB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/comments', comments);
app.use('/api/users', users);

// Error middleware
app.use(notFound);
app.use(errorHandler);

// Listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));