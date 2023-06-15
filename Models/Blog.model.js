const mongoose=require("mongoose");

const blogSchema = new mongoose.Schema({
    username: String,
    title: String,
    content: String,
    category: String,
    date: String,
    likes: Number,
    comments: String,
    author: String,
  });
  
  // Create a Blog model
  const Blog = mongoose.model('Blog', blogSchema);
  module.exports={
      Blog
  }