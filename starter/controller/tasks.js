const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')

const getAllTasks = asyncWrapper(async (req, res) => {
    
    const tasks = await Task.find({});         // for every document
    res.status(200).json({tasks})
    
    // to check if functionality is working properly
    // res.json(req.body)
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task})
    //     // general internal server error
    //     res.status(500).json({msg:error}) 
})

const getTask = asyncWrapper(async (req, res) => { 
    const {id:taskID} = req.params;
    const task = await Task.findOne({_id : taskID})
    if(!task){
        // correct syntax of the ID but cannot find the item
        return res.status(404).json({msg : `No task with id : ${taskID}`})
    }
    res.status(200).json({task})
        // wrong syntax of the ID, like length
        // res.status(500).json({msg : error}

    // res.json({id:req.params.id, body:req.body })
})

const updateTask = asyncWrapper(async (req, res) => { 
    
    const {id:taskID} = req.params;
    
    // (filter, update, option)
    const task = await Task.findByIdAndUpdate({_id:taskID}, req.body, {
        new:true,                   // will send the modified task
        runValidators:true,         // validating the modifed data
    })
    if(!task){
        return res.status(404).json({msg : `No task with id : ${taskID}`})
    }
    res.status(200).json(task)
    
})

const deleteTask = asyncWrapper(async (req, res) => {
    const {id:taskID} = req.params;
    const task = await Task.findOneAndDelete({_id:taskID})
    if(!task){
        return res.status(404).json({msg : `No task with id : ${taskID}`})
    }
    res.status(200).json({task})
    // res.status(200).send()
    // res.status(200).json({task : null, status : 'success'})
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}