const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
app.use(cors())

const { Server } = require('socket.io')
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

let onlineUsers = []
io.on("connection", (socket) => {
    socket.emit("user-connected")
    socket.on("user-online", (user) => {
        if (!onlineUsers.includes(user) && user !== null && user != undefined)
            onlineUsers.push(user)
        socket.emit("users-online", onlineUsers)
    })
    socket.on("user-loggedout", (username) => {
        onlineUsers = onlineUsers.filter((usr) => {
            if (usr !== username) return usr;
        })
        socket.broadcast.emit("user-disconnected", onlineUsers)
    })
    socket.on('send-message', (message) => {
        socket.broadcast.emit("receive-message", message)
    })
})

server.listen(3000, () => {
    console.log('server listening on port 3000');
})