const mongoose = require("mongoose")


const MessageSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Types.ObjectId,
        required: [true, "Please provide sender id"]
    },
    sender_username: {
        type: String,
        required: [true, "Please provide sender username"],
    },
    text: {
        type: String,
        required: [true, "Please provide a text"],
        trim: true
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("Messages", MessageSchema)