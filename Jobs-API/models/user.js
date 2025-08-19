const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide name'],
        minlength:3,
        maxlength:50,
    },
    email:{
        type:String,
        required:[true, 'Please provide email'],
        minlength:3,
        maxlength:50,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please proive valid email'
        ],
        unique: true,           // not a validator, creates a unique index
    },
    password:{
        type:String,
        required:[true, 'Please provide password'],
        minlength:6,
    },
})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)             // how many random bytes we will get
    this.password = await bcrypt.hash(this.password,salt)
})

UserSchema.methods.getName = function(){                // function keyword will always point to our document
    return this.name                                    // but arrow function doesn't
}

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id, name:this.name},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME,})
}

module.exports = mongoose.model('User',UserSchema)