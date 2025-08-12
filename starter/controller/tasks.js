const Task = require('../models/Task')

const getAllTasks =  (req, res) => {
    res.send('get all items')
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task})
    } catch (error) {
        // general internal server error
        res.status(500).json({msg:error}) 
    }
    
    // to check if functionality is working properly
    // res.json(req.body)
}

const getTask = (req, res) => { 
    res.json({id:req.params.id, 
        body:req.body
    })
}

const updateTask = (req, res) => {
    res.json({id:req.params.id, 
        body:req.body
    })
}

const deleteTask = (req, res) => {
    res.json({id:req.params.id, 
        body:req.body
    })
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}