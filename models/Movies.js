const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
  status: { type: Boolean, default: false }, // Status, e.g., true/false
  msg: { type: String, default: '' }, // Message
  movie: {
    _id: { type: String, required: false }, // Movie ID
    name: { type: String, required: false }, // Movie name
    slug: { type: String, required: false }, // Movie slug
    origin_name: { type: String, required: false }, // Original movie name
    content: { type: String, required: false }, // Movie content
    type: { type: String, required: false }, // Movie type (e.g., action, animation)
    status: { type: String, required: false }, // Movie status (e.g., completed, ongoing)
    thumb_url: { type: String, required: false }, // Thumbnail URL
    poster_url: { type: String, required: false }, // Poster URL
    chieurap: { type: Boolean, default: false }, // In theaters or not
    lang: { type: String, required: false }, // Language (e.g., Vietsub)
    year: { type: Number, required: false }, // Release year
    category: [
      {
        id: { type: String, required: false }, // Category ID
        name: { type: String, required: false }, // Category name (e.g., Family)
        slug: { type: String, required: false }  // Category slug
      }
    ], // List of categories
    country: [
      {
        id: { type: String, required: false }, // Country ID
        name: { type: String, required: false }, // Country name (e.g., US, UK)
        slug: { type: String, required: false }  // Country slug
      }
    ] // List of countries
  }
});

// Create MongoDB model
const Movies = mongoose.model('Movies', movieSchema);
module.exports = Movies;