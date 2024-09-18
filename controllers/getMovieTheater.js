const mongoose = require('mongoose');

/**
 * Controller để lấy danh sách phim theo năm với phân trang
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getMovieTheater = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1; // Default là trang 1
        const limit = 10; // Số lượng phim trên mỗi trang

        if (isNaN(page)) {
            return res.status(400).json({ error: 'trang không hợp lệ.' });
        }
     
        const collection = mongoose.connection.collection('movies_chieu_rap');
        // Tính toán số lượng phim để bỏ qua dựa trên trang hiện tại
        const skip = (page - 1) * limit;

        // Truy vấn dữ liệu từ MongoDB
        const movies = await collection.find().skip(skip).limit(limit).toArray();
        const totalItems = await collection.countDocuments();
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
                items: movies,
                titlePage: `Phim chiếu rạp`,
                seoOnPage: {
                    og_type: "website",
                    titleHead: `Phim Chiếu Rạp Mới Hay Hot Nhất Năm 2024| Phim Chiếu Rạp hay nhât | Phim Chiếu Rạp tuyển chọn`,
                    descriptionHead: `Phim Chiếu Rạp mới nhất tuyển chọn hay nhất. Top những bộ phim đáng để bạn cày. ĐỪNG BỎ LỠ`,
                    og_url: `the-loai/phim-chieu-rap`
                  },
           }
        });
    } catch (error) {
        console.error('Lỗi khi lấy phim:', error);
        res.status(500).json({ error: 'Lỗi server khi lấy phim.' });
    }
};

module.exports = { getMovieTheater };
