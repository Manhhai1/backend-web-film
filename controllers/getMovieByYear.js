
const Movies = require('../models/Movies')
/**
 * Controller để lấy danh sách phim theo năm với phân trang
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getMoviesByYear = async (req, res) => {
    try {
        const year = parseInt(req.params.year, 10);
        const page = parseInt(req.query.page, 10) || 1; // Mặc định là trang 1
        const limit = 10; // Số lượng phim trên mỗi trang
        // Kiểm tra xem năm và trang có hợp lệ không
        if (isNaN(year) || isNaN(page)) {
            return res.status(400).json({ error: 'Năm hoặc trang không hợp lệ.' });
        }
        // Tính toán số lượng tài liệu cần bỏ qua
        const skip = (page - 1) * limit;
        // Lấy tổng số tài liệu cho năm đã cho
        const totalItems = await Movies.countDocuments({ "movie.year": year });
        if (totalItems === 0) {
            return res.status(404).json({ message: 'Không tìm thấy phim cho năm này.' });
        }
        // Lấy phim theo năm với phân trang
        const moviesByYear = await Movies.find({ "movie.year": year })
            .skip(skip)
            .limit(limit);
        const totalPages = Math.ceil(totalItems / limit);

        // Trả về dữ liệu
        res.status(200).json({
            data: {
                params: {
                    pagination: {
                        totalItems,
                        totalItemsPerPage: limit,
                        currentPage: page,
                        totalPages,
                    },
                },
                items: moviesByYear, // Thay đổi thành moviesByYear
                titlePage: `Phim năm ${year}`,
                seoOnPage: {
                    og_type: "website",
                    titleHead: `Top phim ${year} | Phim năm ${year} hay nhất | Phim năm ${year} tuyển chọn`,
                    descriptionHead: `Top phim ${year} mới nhất tuyển chọn chất lượng cao, phim hay ${year} vietsub cập nhật nhanh nhất. Phim top-phim vietsub nhanh nhất`,
                    og_url: `nam/${year}`
                },
            },
        });
    } catch (error) {
        console.error('Lỗi khi lấy phim:', error);
        res.status(500).json({ error: 'Lỗi server khi lấy phim.' });
    }
};


module.exports = { getMoviesByYear };
