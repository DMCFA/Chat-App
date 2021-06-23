//Requirements
require('dotenv').config()
const path = require('path')
const express = require('express')
const http = require('http')
const socket = require('socket.io')
const formatMessage = require('./utils/msg')
const { joinUser, getUser } = require('./utils/users')

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
    socket.on('joinedRoom', ({ username, room }) => {

        const user = joinUser(socket.id, username, room)

        socket.join(user.room)

        //Welcome message to user
        socket.emit('message', formatMessage(msgBot, 'Welcome to ChatDirect'))

        //Anounce new connected user
        socket.broadcast.to(user.room).emit('message', formatMessage(msgBot, `${user.username} has entered the room`))

    })

    //Anounce disconnected user
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(msgBot, `A user has left the room`))
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