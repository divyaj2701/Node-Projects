// check for username, password in post(login) request
// if exist create new JWT
// send back to fron-end

// setup authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken')
const {BadRequestError} = require('../errors')

const login = async (req, res) => {
    const {username, password} = req.body
    // console.log(username, password);                 

    // mongo - mongo's required validation 
    // Joi - set up entire additonal layer of validation, using another package i.e. Joi
    // check in the controller

    if(!username || !password){
        throw new BadRequestError('Please Provide email and password')     // 400 -> Bad request
    }

    // just for the demo, normally provided by DB!!
    const id = new Date().getDate()

    // try to keep payload small, better experience for user
    // bigger the payload the more data you are sending over the wire
    const token = jwt.sign({id, username}, process.env.JWT_SECRET,{expiresIn:'30d'})    // payload, jwt secret, options

    res.status(200).json({msg:'user created', token})
}

const dashboard = async (req ,res) => {

    console.log(req.user)
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello, ${req.user.username}`, secret:`Authorized data: Lucky Number ${luckyNumber}`})
    
}

module.exports = {
    login,
    dashboard
}