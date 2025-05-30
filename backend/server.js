const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes'); // Correct path to your authRoutes.js file

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000' // Replace with the URL of your frontend
}));
app.use(express.json()); // Parse incoming JSON data

// Use the routes
app.use('/api/auth', authRoutes); // Ensures routes like /api/auth/register and /api/auth/login are available

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Log routes for debugging (optional)
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(middleware.route);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
