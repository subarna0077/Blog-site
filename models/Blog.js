const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title should be atleast 5 character long'],
        minlength: 5
    },
    content: {
        type: String,
        required: [true, 'Content should be atleast 200 characters long'],
        minlength: 5
    },
    author: {
        type: String,
        default: 'unknown'
    },
    tags: {
        type: [String],
    },
    slug: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    }
})

module.exports = mongoose.model('Blog', BlogSchema)