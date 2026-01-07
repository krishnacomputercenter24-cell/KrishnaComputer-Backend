import express from 'express';
import { addBlog, deleteBlog, editBlog, getAllBlog } from '../controller/blog.controller.js';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.get('/blogs', getAllBlog);
router.put('/:id',editBlog);
router.post('/add-blog', addBlog);
router.delete('/:id', deleteBlog);


router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: 'uploads' },
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ imageUrl: result.secure_url });
      }
    );

    result.end(req.file.buffer);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Upload failed' });
  }
});



export default router;