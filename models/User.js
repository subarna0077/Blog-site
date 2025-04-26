const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

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
        required: [true, 'Provide a valid email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'provide valid password']
    } 
})

UserSchema.pre('save', async function (next){
    const genSalt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,genSalt)
    next()
})

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatchingPassword = bcrypt.compare(candidatePassword, this.password)
    return isMatchingPassword;
}

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId: this._id, name: this.firstName}, process.env.SECRET_KEY , {
        expiresIn: process.env.EXPIRES_IN
    })
}

module.exports = mongoose.model('User', UserSchema);



//before submitting the password to the db, make sure to hash it using the bcrypt js
