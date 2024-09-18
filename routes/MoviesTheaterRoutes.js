const express = require('express');
const router = express.Router();

// Import controller
const { getMovieTheater } = require('../controllers/getMovieTheater');

router.get('/the-loai/phim-chieu-rap', getMovieTheater);

module.exports = router;
