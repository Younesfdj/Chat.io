require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser');
const connectDB = require("./db/connectDB")
const auth = require('./routes/userRoute')
const message = require('./routes/messagesRoute')
const { authUser } = require('./middlwares/authUser')
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use('/api/v1/', auth)
app.use('/api/v1/chat/', authUser, message)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`Server is listening on port ${PORT}`))

    } catch (error) {
        console.log(error)
    }
}

start()