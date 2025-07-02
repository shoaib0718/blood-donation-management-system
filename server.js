const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const dotenv = require('dotenv');
  const donorRoutes = require('./routes/donorRoutes');
  const path = require('path');


  dotenv.config();

  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  // Serve frontend static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));
// In server.js, before mongoose.connect
console.log('MONGODB_URI:', process.env.MONGODB_URI);
  // MongoDB connection
  mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => console.log('Connected to MongoDB'));

  // Routes
  app.use('/api/donors', donorRoutes);
  const authRoutes = require('./routes/authRoutes');

app.use('/api', authRoutes); // this enables /api/register and /api/login


  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));