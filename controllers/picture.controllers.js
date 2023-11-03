const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Imagekit = require('../libs/imagekit');
const path = require('path');

module.exports = {
  // add images, titles and descriptions
  inputPict: async (req, res, next) => {
    try {
      let { judul, deskripsi } = req.body;
      if (!deskripsi) throw 'Masukkan Judul dan Deskripsi';
      let strFile = req.file.buffer.toString('base64');

      const { url, fileId } = await Imagekit.upload({
        fileName: Date.now() + path.extname(req.file.originalname),
        file: strFile,
      });

      const pict = await prisma.picture.create({
        data: {
          judul,
          deskripsi,
          gambar: url,
          fileId: fileId,
        },
      });

      if (!pict) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request!',
          err: err.message,
          data: null,
        });
      }

      return res.status(201).json({
        status: true,
        message: 'Created!',
        err: null,
        data: { pict },
      });
    } catch (err) {
      next(err);
    }
  },

  // View a list of images that have been uploaded
  indexPicture: async (req, res, next) => {
    try {
      const pict = await prisma.picture.findMany();

      if (!pict) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request!',
          err: err.message,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Ok!',
        err: null,
        data: { pict },
      });
    } catch (err) {
      next(err);
    }
  },

  // Melihat detail gambar
  showDetailPict: async (req, res, next) => {
    try {
      let { id } = req.params;
      const pict = await prisma.picture.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!pict) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request!',
          err: 'Post with id does not exist',
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Ok!',
        err: null,
        data: { pict },
      });
    } catch (err) {
      next(err);
    }
  },

  // Delete images by ID without removing title and description
  deleteImage: async (req, res, next) => {
    try {
      const { fileId } = req.params;
      const deleteImage = await Imagekit.deleteFile(fileId, (error, result) => {
        if (error) {
          return res.status(400).json({
            status: false,
            message: 'Bad Request!',
            err: error.message,
            data: null,
          });
        } else {
          return res.status(200).json({
            status: true,
            message: 'Deleted image success!',
            err: null,
            data: null,
          });
        }
      });
    } catch (err) {
      next(err);
    }
  },

  // Edit the title and description of the uploaded image.
  updatePict: async (req, res, next) => {
    try {
      let { id } = req.params;
      let { judul, deskripsi } = req.body;

      const pict = await prisma.picture.findUnique({ where: { id: Number(id) } });
      if (!pict) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request!',
          err: 'post with id does not exist',
          data: null,
        });
      }

      const updatePict = await prisma.picture.update({
        where: {
          id: Number(id),
        },
        data: {
          judul,
          deskripsi,
        },
      });

      if (!updatePict) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request!',
          err: err.message,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Ok!',
        err: null,
        data: { pict: updatePict },
      });
    } catch (err) {
      next(err);
    }
  },
};