const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId


const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        require: true
    }, 
    userId: {
        type: objectId,
        ref: "User"
    },
    postId: {
        type: objectId,
        ref: "post"
    }
}, { timestamps: true })

module.exports = mongoose.model("Comment", commentSchema)


    