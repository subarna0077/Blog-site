const { StatusCodes } = require('http-status-codes');
const { UnauthenticatedError } = require('../errors');
const BadRequestError = require('../errors/bad-request');
const User = require('../models/User')


const register = async (req, res)=>{
    const user = await User.create({...req.body});
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        user: {
            name: user.firstName +' '+ user.lastName
        },
        token
    })
}


const login = async (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Email is not registered in our system.')
    }
    const isCorrectPassword = user.comparePassword(password)
    if(!isCorrectPassword) {
        throw new UnauthenticatedError('Incorrect password.')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: user.firstName, token})

}

module.exports = {login, register}