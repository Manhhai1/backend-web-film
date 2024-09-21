const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRoutes = require('./routes/MoviesRoutes');
const movieTheaterRoutes = require('./routes/MoviesTheaterRoutes');
const movieSearchRoutes = require('./routes/MovieSearchRoutes')
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối đến MongoDB
mongoose.connect(process.env.MONGODB, {})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.log('MongoDB connection error:', err));

// Hàm gom các collection
// Định nghĩa các route
app.use('/api', movieRoutes);
app.use('/api', movieTheaterRoutes);
app.use('/api', movieSearchRoutes);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
