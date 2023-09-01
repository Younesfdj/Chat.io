const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
app.use(cors())

const { Server } = require('socket.io')
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // origin connection (client @)
        methods: ["GET", "POST"]
    }
})

let chat = []

// listen to an event
io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    // receive a message from the client
    socket.on('send-message', (message) => {
        // console.log("Message :", message);
        // send message to other users except you (send to client side)
        socket.broadcast.emit("receive-message", message)
    })
})

server.listen(3000, () => {
    console.log('server listening on port 3000');
})