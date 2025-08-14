const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../error/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});         // for every document
    res.status(200).json({tasks})
    // to check if functionality is working properly
    // res.json(req.body)
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task})
})

const getTask = asyncWrapper(async (req, res, next) => { 
    const {id:taskID} = req.params;
    const task = await Task.findOne({_id : taskID})
    if(!task){
        // correct syntax of the ID but cannot find the item
        return next(createCustomError(`No task with id : ${taskID}`, 404))
        // const error = new Error('Not Found');                    // m-1
        // error.status = 404;
        // return next(error);
        // return res.status(404).json({msg : `No task with id : ${taskID}`})      // m-2
    }
    res.status(200).json({task})

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
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json(task)
    
})

const deleteTask = asyncWrapper(async (req, res) => {
    const {id:taskID} = req.params;
    const task = await Task.findOneAndDelete({_id:taskID})
    if(!task){
        return next(createCustomError(`No task with id : ${taskID}`, 404))
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