//Requirements
require('dotenv').config()
const path = require('path')
const express = require('express')
const http = require('http')
const socket = require('socket.io')

//Global variables
const app = express()
const server = http.createServer(app)
const io = socket(server)
const port = process.env.PORT || 3000

//Static folder
app.use(express.static(path.join(__dirname, '/public')));

//Client connection
io.on('connection', socket => {
    
    //Welcome message to user
    socket.emit('message', 'Welcome to ChatDirect');

    //Anounce new connected user
    socket.broadcast.emit('message', 'A user has entered the room')

    //Anounce disconnected user
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the room')
    })

    //Capture chat messages
    socket.on('chatMessage', msg => {
        console.log(msg);
    })
})

//Server
server.listen(port, () => {
    console.log(`server listening in port ${port}`);
})