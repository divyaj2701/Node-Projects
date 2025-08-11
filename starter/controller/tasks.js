const getAllTasks =  (req, res) => {
    res.send('get all items')
}

const createTask = (req, res) => {
    // to check if functionality is working properly
    res.json(req.body)
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