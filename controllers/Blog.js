const { BadRequestError} = require('../errors/bad-request')
const {StatusCodes, CREATED} = require('http-status-codes')
const Blog = require('../models/Blog')
const { NotFoundError } = require('../errors')

const getAllBlogs = async(req, res)=>{
    try {
        const allBlogs = await Blog.find({})
        res.status(StatusCodes.OK).json({msg: 'All blog list', allBlogs})
    }catch(error) {
        throw error;
    } 
}

const getSingleBlog = async (req, res)=>{
        const id = req.params.id;
        if(!id) {
            throw new BadRequestError('Blog id is required')
        }
        const singleBlog = await Blog.findOne({_id:id})
        if(!singleBlog) {
          throw new NotFoundError('Blog ID not found.')
        }
        res.status(StatusCodes.OK).json({msg: 'Blog retrieved', singleBlog})
}

const createBlog = async(req, res)=>{
        if(!req.body){
            throw new BadRequestError('Please enter all the details to create a new bloh')
        }
        req.body.createdBy = req.user.userId;
        const blog = await Blog.create(req.body);
        res.status(StatusCodes.CREATED).json({msg: 'Blog created', blog})
}

const deleteBlog = async(req, res)=>{ 
        const {id} = req.params;
        if(!id) {
            throw new BadRequestError('Blog id is required')
        }
        const blog = await Blog.findOne({_id: id , createdBy: req.user.userId})   
        if(!blog){
            throw new NotFoundError(`No blog with id ${id} found.`)
        }
        await blog.deleteOne()
        res.status(StatusCodes.OK).json({msg:'Blog deleted'})
}

const updateBlog = async (req, res)=>{
        const updatedBlog = await Blog.findOneAndUpdate({_id:req.params.id, createdBy: req.user.userId}, req.body, {
            new:true,
            runValidators:true,
        })
        if(!updatedBlog) {
            throw new NotFoundError('Not found')
        }
        res.status(StatusCodes.OK).json({msg: 'Updated blog', updatedBlog})
}  


module.exports = {
    getAllBlogs, getSingleBlog, updateBlog, deleteBlog,createBlog
}