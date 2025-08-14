require('dotenv').config();
require('express-async-errors')     // async errors
 

const express = require('express');
const app = express();

const connectDB = require('./db/connect')
const productRouter = require('./routes/products')


const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware
// automatically parse incoming requests with JSON payloads and make the parsed data available in req.body
app.use(express.json())                 // enables json parsing

// routes   - testing
app.get('/', (req ,res) => {
    res.send('<h1>Store API</h1><a href="api/v1/products">Products route</a>')
})

app.use('/api/v1/products',productRouter)

// product routes


app.use(notFoundMiddleware)
app.use(errorMiddleware)


const port = process.env.PORT || 3000;

const start = async () => {
    try{
        // connect DB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on ${port}!!!`))
    }catch(error){
        console.log(error)
    }
}

start()