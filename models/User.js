const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'must be atleast 3'],
        minlength: 3
    },
    lastName: {
        type: String,
        required: [true, 'must be atleast 5'],
        minlength: 3
    },
    email: {
        type: String,
        required: [true, 'Provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'provide valid password']
    } 
})

UserSchema.pre('save', ()=>{
    const genSalt =  bcrypt.genSalt(10)
    this.password = bcrypt.hash(this.password,genSalt)
    next()
})

module.exports = UserSchema;



//before submitting the password to the db, make sure to hash it using the bcrypt js
