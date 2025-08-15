const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')


const authenticationMiddleware = async (req, res, next) => {
    // console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No token provide')  // 401 -> authentication error
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
        throw new UnauthenticatedError('Not authorized to access this route')
    }
}

module.exports = authenticationMiddleware