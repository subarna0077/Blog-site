const express = require('express')
const router = express.Router();
const {createBlog, getAllBlogs, getSingleBlog, deleteBlog, updateBlog} = require('../controllers/Blog')
router.route('/').get(getAllBlogs).post(createBlog)
router.route('/:id').get(getSingleBlog).delete(deleteBlog).patch(updateBlog)
module.exports = router;