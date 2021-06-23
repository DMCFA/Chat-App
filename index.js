//Requirements
require('dotenv').config()
const path = require('path')
const express = require('express')
const http = require('http')
const socket = require('socket.io')
const formatMessage = require('./utils/msg')

//Global variables
const app = express()
const server = http.createServer(app)
const io = socket(server)
const port = process.env.PORT || 3000
const msgBot = 'ChatDirect'

//Static folder
app.use(express.static(path.join(__dirname, '/public')));

//Client connection
io.on('connection', socket => {
    
    //Welcome message to user
    socket.emit('message', formatMessage(msgBot, 'Welcome to ChatDirect'))

    //Anounce new connected user
    socket.broadcast.emit('message', formatMessage(msgBot, 'A user has entered the room'))

    //Anounce disconnected user
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(msgBot, 'A user has left the room'))
    })

    //Capture chat messages
    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage('USER', msg))
    })
})

//Server
server.listen(port, () => {
    console.log(`server listening in port ${port}`);
})