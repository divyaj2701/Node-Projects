// take our controller as an argument and set up try and catch block
// controller is aysnc that's why async-await

const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        }
        catch(error){
            next(error)
        }
    }
}

module.exports = asyncWrapper