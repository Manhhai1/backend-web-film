const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho Movie
const movieSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  poster_url: { 
    type: String, 
    required: true 
  },
  thumb_url: { 
    type: String, 
    required: true 
  },
  slug: { 
    type: String, 
    required: true,
    unique: true 
  },
  quality: { 
    type: String, 
    required: true 
  },
  origin_name: { 
    type: String, 
    required: true 
  },
  lang: { 
    type: String, 
    default: 'Vietsub' 
  }
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

// Tạo model Movie từ schema
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
