const express=require("express");
const { verifyToken } = require("../Middleware/authent");
const { Blog } = require("../Models/Blog.model");

const blogRouter=express.Router();

blogRouter.use(verifyToken);
blogRouter.get("/",async(req,res)=>{

    try {
        const { page = 1, limit = 5, title, category, sort, order } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        let query = {};
    
        // Apply filters if provided
        if (title) {
          query.title = { $regex: new RegExp(title, 'i') };
        }
        if (category) {
          query.category = { $regex: new RegExp(category, 'i') };
        }
    
        // Get total count of blogs
        const totalCount = await Blog.countDocuments(query);
    
        // Get paginated and sorted blogs
        let blogs = await Blog.find(query)
          .populate('author')
          .skip(skip)
          .limit(parseInt(limit));
    
        // Sort blogs if requested
        if (sort && order) {
          const sortOptions = {};
          sortOptions[sort] = order === 'asc' ? 1 : -1;
          blogs = blogs.sort(sortOptions);
        }
    
        res.json({ totalCount, blogs });
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch blogs.' });
      }
})

blogRouter.post('/', async (req, res) => {
    const { username, title, content, category, date, likes, comments } = req.body;
  console.log(req.body,req.userId)
    try {
      // Create a new blog with the provided data
      
      let blog = new Blog({
        username,
        title,
        content,
        category,
        date,
        likes,
        comments,
        author: req.userId, // Set the author to the logged in user's ID
      });
      
      
      const savedBlog = await blog.save();
      console.log(savedBlog,"savedBlog")
      res.status(201).json(savedBlog);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create blog.' });
    }
});

module.exports={
    blogRouter
}