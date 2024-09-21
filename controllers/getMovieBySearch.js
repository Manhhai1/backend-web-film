// controllers/MoviesController.js
const Movies = require('../models/Movies');

const searchByNameVN = str => {
  str = str.replace(/%20/g, ' ');
  str = str.replace(
    /[^a-zA-Z0-9áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ]/g,
    ' '
  );
  return str.trim();
};

const searchBySlug = str => {
  str = str.replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, 'a');
  str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, 'e');
  str = str.replace(/i|í|ì|ỉ|ĩ|ị/g, 'i');
  str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, 'o');
  str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, 'u');
  str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/%20/g, '-');
  str = str.replace(/[^a-zA-Z0-9-]/g, '-');
  str = str.replace(/^-+|-+$/g, '');
  return str.trim();
};
const searchMovies = async (req, res) => {
  try {
    const { keyword, page = 1 } = req.query; // Mặc định page là 1
    if (!keyword) {
      return res.status(400).json({ message: 'Keyword is required' });
    }

    const regexKeywordByName = new RegExp(searchByNameVN(keyword), 'i');
    const regexKeywordBySlug = new RegExp(searchBySlug(keyword), 'i');

    // Tạo hai truy vấn khác nhau và thực hiện đồng thời
    const [totalItems, movies] = await Promise.all([
      Movies.countDocuments({
        $or: [
          { "movie.name": { $regex: regexKeywordByName } },
          { "movie.origin_name": { $regex: regexKeywordByName } },
          { "movie.slug": { $regex: regexKeywordBySlug } },
          { "movie.content": { $regex: regexKeywordByName } },
        ]
      }),
      Movies.find({
        $or: [
          { "movie.name": { $regex: regexKeywordByName } },
          { "movie.origin_name": { $regex: regexKeywordByName } },
          { "movie.slug": { $regex: regexKeywordBySlug } },
          { "movie.content": { $regex: regexKeywordByName } },
        ]
      })
      .skip((page - 1) * 10) // Đảm bảo rằng bạn sử dụng limit đúng ở đây
      .limit(10)
    ]);

    const totalPages = Math.ceil(totalItems / 10); // Tổng số trang

    res.status(200).json({
      data: {
        params: {
          pagination: {
            totalItems,
            totalItemsPerPage: 10,
            currentPage: page,
            totalPages,
          },
        },
        items: movies,
        titlePage: `Kết quả tìm kiếm cho: "${keyword}"`,
        seoOnPage: {
          og_type: "website",
          titleHead: `Tìm kiếm: ${keyword} | Top phim hay nhất 2024 | Tìm kiếm phim theo từ khóa | Phim hay`,
          descriptionHead: `Tìm kiếm phim theo từ khóa: ${keyword}.`,
          og_url: `search/${encodeURIComponent(keyword)}`
        },
      }
    });
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({ message: 'Error searching movies' });
  }
};

module.exports = { searchMovies };


module.exports = {
  searchMovies,
};
