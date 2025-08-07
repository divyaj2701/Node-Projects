const getAllTasks =  (req, res) => {
    res.send('get all items')
}

const createTask = (req, res) => {
    // to check if functionality is working properly
    res.json(req.body)
    // res.send('Create Task')
}

const getTask = (req, res) => {
    // to check if functionality is working properly
    res.json({id:req.params.id, 
        body:req.body
    })
    // res.send('get single Task')
}

const updateTask = (req, res) => {
    // to check if functionality is working properly
    res.json({id:req.params.id, 
        body:req.body
    })
    // res.send('update Task')
}

const deleteTask = (req, res) => {
    // to check if functionality is working properly
    res.json({id:req.params.id, 
        body:req.body
    })
    // res.send('delete Task')
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}