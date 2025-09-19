const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        minlength:[6, 'Password must be 6 letters long']
    }
},
{
    timestamps: true
})
module.exports = mongoose.model("user", userSchema)