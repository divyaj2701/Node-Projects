const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticateError} = require('../errors')

const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res
        .status(StatusCodes.CREATED)
        .json({user:{name:user.name}, token})
}

const login = async (req, res) => {
    // res.status(200).send('Login route')
    const {email, password} = req.body

    if(!email || !password){
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticateError('Invalid Credentials')
    }
    
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticateError('Invalid Credentials')
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:{name:user.name}, token})

}

module.exports = {
    register,
    login,
}

