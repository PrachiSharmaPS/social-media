const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId

const likeSchema = new mongoose.Schema({
    userId: {
        type: objectId,
        ref: "User"
    }, 
    postId: {
        type: objectId,
        ref: "post", 
    }
}, { timestamps: true })

module.exports = mongoose.model("Like", likeSchema)


    