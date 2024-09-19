const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho Movie
const movieSchema = new Schema({
  name: { 
    type: String, 
    required: false
  },
  poster_url: { 
    type: String, 
    required: false
  },
  thumb_url: { 
    type: String, 
    required: false
  },
  slug: { 
    type: String, 
    required: false,
  },
  quality: { 
    type: String, 
    required: false
  },
  origin_name: { 
    type: String, 
    required: false
  },
  lang: { 
    type: String, 
    default: 'Vietsub' 
  }
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

// Tạo model Movie từ schema
const Movies = mongoose.model('Movie', movieSchema);

module.exports = Movies;
