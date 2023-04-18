const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId

const followSchema = new mongoose.Schema({
    followerId: {
        type: objectId,
        ref: "User"
    }, 
    followingId: {
        type: objectId,
        ref: "User", 
    }
}, { timestamps: true })

module.exports = mongoose.model("Follow",followSchema)