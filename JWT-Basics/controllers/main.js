// check for username, password in post(login) request
// if exist create new JWT
// send back to fron-end

// setup authentication so only the request with JWT can access the dashboard


const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {
    const {username, password} = req.body
    // console.log(username, password);                 

    // mongo - mongo's required validation 
    // Joi - set up entire additonal layer of validation, using another package i.e. Joi
    // check in the controller


    if(!username || !password){
        throw new CustomAPIError('Please Provide email and password', 400)     // 400 -> Bad request
    }

    res.send('Fake Login/Register/SignUp Route')
}

const dashboard = async (req ,res) => {
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello, DJ`, secret:`Authorized data: Lucky Number ${luckyNumber}`})
}

module.exports = {
    login,
    dashboard
}