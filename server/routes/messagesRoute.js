const express = require("express")
const {
    getAllMessages,
    saveMessage
} = require("../controllers/messagesController")
const router = express.Router()

router.route('/getChat').get(getAllMessages)
router.route('/saveMessage').post(saveMessage)

module.exports = router