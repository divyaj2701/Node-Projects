const CustomAPIError = require('./custom-error')
const BadRequestError = require('./bad-request')
const UnauthenticateError = require('./unauthenticated')
const NotFoundError = require('./not-found')

module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthenticateError,
    NotFoundError,
}