const errorHandlerMiddleware = (err, req, res, next) => {
    // return res.status(500).json({msg:'something went wrong, try again later'})
    return res.status(500).json({msg:err})
}

module.exports = errorHandlerMiddleware