const slugify = require('slugify')
const mongoose = require('mongoose')


const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title should be atleast 5 character long'],
        minlength: 5
    },
    content: {
        type: String,
        required: [true, 'Content should be atleast 50 characters long'],
        minlength: 50
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

BlogSchema.pre('save', function(next){
    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict:true})
    }
    next();

})



module.exports = mongoose.model('Blog', BlogSchema)