const express = require('express');
const router = express.Router();

// Import controller
const { getMoviesByYear } = require('../controllers/getMovieByYear');

// Route để lấy danh sách phim theo năm
// Ví dụ: GET http://localhost:5000/api/nam/2024?page=1
router.get('/nam/:year', getMoviesByYear);

module.exports = router;
