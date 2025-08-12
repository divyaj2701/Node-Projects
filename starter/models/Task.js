const mongoose = require('mongoose');


// set up properties as object, and set up built-in validators.
// w/o validation => name;String 
const TaskSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,'must provide name'],       // true/false, custom message(optional)
        trim:true,                       // removing extra spaces from front and back
        maxLength:[20, 'name can not be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model('Task', TaskSchema)     // name, schema
                                                    // name -> singular name of the collection your model is for