const multer = require('multer');  // Mengimpor pustaka Multer untuk mengelola unggahan berkas.
const path = require('path');      // Mengimpor pustaka 'path' untuk mengelola jalur berkas.

function generateFilter(props) {
  try {
    let { allowedMimeTypes } = props;  // Mendeklarasikan jenis MIME yang diizinkan dari properti yang diberikan.
    return multer({
      fileFilter: (req, file, callback) => {
        if (!allowedMimeTypes.includes(file.mimetype)) {  // Memeriksa apakah jenis MIME berkas tidak diizinkan.
          const err = new Error(`!only ${allowedMimeTypes.join(',')} allowed to upload`);
          return callback(err, false);  // Mengembalikan kesalahan jika jenis MIME tidak diizinkan.
        }
        callback(null, true);  // Mengizinkan unggahan berkas jika jenis MIME diizinkan.
      },
      onError: (err, next) => {
        next(err);  // Menyampaikan kesalahan ke middleware selanjutnya jika terjadi kesalahan.
      },
    });
  } catch (err) {
    return err.message;  // Mengembalikan pesan kesalahan jika terjadi kesalahan saat mencoba membuat filter.
  }
}

module.exports = {
  image: generateFilter({
    allowedMimeTypes: ['image/png', 'image/jpeg'],  // Menggunakan generateFilter untuk membuat filter unggahan gambar dengan jenis MIME yang diizinkan.
  }),
};