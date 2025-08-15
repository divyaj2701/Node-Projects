require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


// middleware
app.use(express.static('./public'))          // index.html, .css etc. files
app.use(express.json())                     // there is post route => to access req.body


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error); 
    }
}

start()