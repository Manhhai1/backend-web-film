const express = require('express');
const router = express.Router();

// Import controller
const { searchMovies } = require('../controllers/getMovieBySearch');

router.get('/search', searchMovies);

module.exports = router;
