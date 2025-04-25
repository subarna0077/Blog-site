const getAllBlogs = (req, res)=>{
    res.send('Getting all blogs')
}


const getSingleBlog = (req, res)=>{
    res.send('Getting single blog')
}

const createBlog = (req, res)=>{
    res.send("Creating new blog")
}

const deleteBlog = (req, res)=>{
    res.send('Deleting single blog')
}

const updateBlog = (req, res)=>{
    res.send('Updating blogs')
}

module.exports = {
    getAllBlogs, getSingleBlog, updateBlog, deleteBlog,createBlog
}