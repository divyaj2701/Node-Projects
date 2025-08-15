const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')


const authenticationMiddleware = async (req, res, next) => {
    // console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token provide', 401)  // 401 -> authentication error
    }

    const token = authHeader.split(' ')[1]
    // console.log(token)

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decode)
        const {id, username} = decode
        req.user = {id, username}
        next()
    } catch (error) {
        throw new CustomAPIError('Not authorized to access this route', 401)
    }
}

module.exports = authenticationMiddleware