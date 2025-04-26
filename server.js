const express = require('express');
const mongoose = require('mongoose');
const UserRoutes = require('./routes/User');
const BlogRoutes = require('./routes/Blog');
const authMiddleware = require('./middleware/auth');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ msg: 'Hello world' });
});

// Setting routes
app.use('/api', UserRoutes);
app.use('/api/blogs', authMiddleware, BlogRoutes);

// Connect to MongoDB first, then start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    // Start the server only after DB connection is successful
    app.listen(5000, () => {
      console.log('🚀 Server is running on port 5000');
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB:', err);
  });
