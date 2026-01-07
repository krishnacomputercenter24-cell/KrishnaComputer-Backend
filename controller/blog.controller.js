import Blog from "../model/blog.js";

export const getAllBlog = async (req, res) => {
    try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).send(err.message || "Internal Server Error");
  }
}


export const addBlog = async (req, res) => {
    try {
    const { title, description, content , image} = req.body;
    const blog = new Blog({ title, image, description, content });
    await blog.save();
    
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).send(err.message || "Internal Server Error");
  }
}

export const editBlog = async (req, res) => {
  try {
    const { title, description, content, image } = req.body;
    const update = { title, description, content, image};

    const blog = await Blog.findByIdAndUpdate(req.params.id, update, { new: true });

    if (!blog) return res.status(404).send("Blog not found");

    return res.status(200).json(blog);
  } catch (err) {
    console.error("Edit blog error:", err.message);
    return res.status(400).send(err.message || "Internal Server Error");
  }
};


export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');

    await blog.deleteOne();

    return res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error("Delete blog error:", err.message);
    return res.status(400).send(err.message || "Internal Server Error");
  }
};