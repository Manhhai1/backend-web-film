const mongoose = require('mongoose');

/**
 * Controller để lấy danh sách phim theo năm với phân trang
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getMoviesByYear = async (req, res) => {
    try {
        const year = parseInt(req.params.year, 10);
        const page = parseInt(req.query.page, 10) || 1; // Default là trang 1
        const limit = 10; // Số lượng phim trên mỗi trang

        if (isNaN(year) || isNaN(page)) {
            return res.status(400).json({ error: 'Năm hoặc trang không hợp lệ.' });
        }

        // Tạo tên collection dựa trên năm
        const collectionName = `movies_${year}`;

        // Kiểm tra xem collection có tồn tại không
        const collection = mongoose.connection.collection(collectionName);
        if (!collection) {
            return res.status(404).json({ error: 'Collection không tồn tại.' });
        }

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
                titlePage: `Phim năm ${year}`,
                seoOnPage: {
                    og_type: "website",
                    titleHead: `Top phim ${year} | Phim năm ${year} hay nhât | Phim năm ${year} tuyển chọn`,
                    descriptionHead: `Top phim ${year} mới nhất tuyển chọn chất lượng cao, phim hay ${year} vietsub cập nhật nhanh nhất. Phim top-phim vietsub nhanh nhất`,
                    og_url: `nam/${year}`
                  },
           }
        });
    } catch (error) {
        console.error('Lỗi khi lấy phim:', error);
        res.status(500).json({ error: 'Lỗi server khi lấy phim.' });
    }
};

module.exports = { getMoviesByYear };
