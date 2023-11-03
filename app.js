// Mengimpor konfigurasi variabel lingkungan (environment variables) dari file .env
require('dotenv').config();

const express = require('express'); // Mengimpor modul 'express' untuk membuat aplikasi Express.
const app = express(); // Membuat objek aplikasi Express.

const morgan = require('morgan'); // Mengimpor modul 'morgan' untuk logging permintaan HTTP.
const { PORT } = process.env; // Mengambil nilai PORT dari variabel lingkungan.

const router = require('./routes/picture.routes'); // Mengimpor rute-rute dari berkas 'picture.routes'.

// Middleware untuk mengizinkan aplikasi Express untuk membaca data JSON dalam permintaan.
app.use(express.json());

// Middleware 'morgan' untuk logging permintaan HTTP dengan format 'dev'.
app.use(morgan('dev'));

// Mengarahkan semua permintaan yang dimulai dengan '/api/v1' ke rute-rute yang diimpor.
app.use('/api/v1', router);

// Rute default untuk permintaan yang tidak cocok dengan rute-rute lainnya.
app.use('/', (req, res) => {
  return res.status(200).json({
    status: true,
    message: 'WELCOME RAILWAY APP AZZA MAULANA',
    err: null,
    data: null,
  });
});

// Aplikasi Express mendengarkan pada PORT yang telah diatur dan mencetak pesan ke konsol saat server berjalan.
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
