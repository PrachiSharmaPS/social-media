const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String, 
        require: true,
        unique:true
    },
    password: {
        type: String, 
        require: true
    },
    followers: {
        type: Number, 
        default: 0
    },
    following: {
        type: Number, 
        default: 0
    },
   

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)

  