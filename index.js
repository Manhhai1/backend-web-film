const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRoutes = require('./routes/MoviesRoutes')
const movieTheaterRoutes =require('./routes/MoviesTheaterRoutes')
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGODB, {
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


// Khởi động server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/api', movieRoutes)
app.use('/api', movieTheaterRoutes)