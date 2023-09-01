const MessageSchema = require("../models/messageModel")
const { StatusCodes } = require("http-status-codes")

const getAllMessages = async (req, res) => {
    try {
        // console.log(req.user);
        const chat = await MessageSchema.find({})
        res.status(StatusCodes.OK).json({ chat: chat })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ err: error.message })
    }
}

const saveMessage = async (req, res) => {
    try {
        const { sender_id, sender_username, text } = req.body
        const msg = await MessageSchema.create({ sender_id, sender_username, text })
        res.status(StatusCodes.OK).json(msg)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ err: error.message })
    }
}

module.exports = {
    getAllMessages,
    saveMessage
}