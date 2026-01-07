// models/Enrollment.js
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: String,
  image: String,
  description: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema)
export default Blog