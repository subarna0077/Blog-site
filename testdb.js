const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://testuser:testuser@blogsapi.qvgipvh.mongodb.net/?retryWrites=true&w=majority&appName=BLOGSAPI')
  .then(() => console.log('✅ Connected successfully!'))
  .catch(err => console.error('❌ Failed to connect:', err));