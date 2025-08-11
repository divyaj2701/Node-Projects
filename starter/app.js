const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()

// middleware
app.use(express.json())     // if we dont use this then we wont have data is req.body 

// routes
app.get('/hello', (req, res) => {
    res.status(200).send("Hello!! welcome to first Node project..")
})

app.use('/api/v1/tasks', tasks)

// app.get('/api/v1/tasks')        - get all the tasks
// app.post('/api/v1/tasks')       - create a new task
// app.get('/api/v1/tasks/:id')    - get single task
// app.patch('api/v1/tasks/:id')   - update task
// app.delete('/api/v1/tasks/:id') - delete task

const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is running on ${port} !!...`))
    } catch (error) {
        console.log(error)
    }
}

start()