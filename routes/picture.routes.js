const router = require('express').Router();  // Mengimpor modul 'express' dan membuat objek router.
const { inputPict, indexPicture, showDetailPict, deleteImage, updatePict } = require('../controllers/picture.controllers');  // Mengimpor fungsi pengontrol dari berkas 'picture.controllers'.
const { image } = require('../libs/multer');  // Mengimpor filter pengelolaan unggahan gambar dari berkas 'multer'.

// Rute untuk mengunggah gambar baru.
router.post('/picture', image.single('gambar'), inputPict);

// Rute untuk menampilkan daftar gambar.
router.get('/picture', indexPicture);

// Rute untuk menampilkan detail gambar berdasarkan ID.
router.get('/picture/:id', showDetailPict);

// Rute untuk menghapus gambar berdasarkan ID file.
router.delete('/picture/:fileId', deleteImage);

// Rute untuk memperbarui gambar berdasarkan ID.
router.put('/picture/:id', updatePict);

module.exports = router;  // Ekspor objek router agar bisa digunakan oleh aplikasi Express lainnya.