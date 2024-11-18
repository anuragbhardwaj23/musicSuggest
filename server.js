const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');

// Initialize the Express app first
const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's URL
  credentials: true, // Allow cookies if necessary
}));

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cookieParser()); // To parse cookies in requests

// Import Routes
const authRoutes = require('./backend/Routes/authRoutes');  // Adjusted path
const chatRoutes = require('./backend/Routes/chatRoutes');  // Adjusted path
const preferencesRoutes = require('./backend/Routes/preferencesRoutes');  // Adjusted path

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/preferences', preferencesRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
