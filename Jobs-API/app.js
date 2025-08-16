require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express();

const connectDB = require('./db/connect')
// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

//routes
app.get('/', (req,res)=>{
    res.send('send jobs')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server is listening on Port ${port}`))
    } catch (error) {
        console.log(error);
        
    }
}

start()