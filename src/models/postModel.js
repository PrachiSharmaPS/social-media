const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId

const postSchema = new mongoose.Schema({
    Title: {
        type: String
    },
    Description: {
        type: String, 
        require: true,
    },
    authorId: {
        type: objectId,
        ref: "User"
    },
    comments: [{
     type: String 
    }],
    
    likes:{
       type: Number,
       default:0 
    }
}, { timestamps: true })

module.exports = mongoose.model("post", postSchema)


    
