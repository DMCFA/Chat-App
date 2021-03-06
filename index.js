//Requirements
require('dotenv').config()
const path = require('path')
const express = require('express')
const http = require('http')
const socket = require('socket.io')
const formatMessage = require('./utils/msg')
const { joinUser, userLeaving, getUser, getRoomUsers } = require('./utils/users')

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

        //Send room and users information
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })

    //Anounce disconnected user
    socket.on('disconnect', () => {

        const user = userLeaving(socket.id)

        if(user) {
            io.to(user.room).emit('message', formatMessage(msgBot, `${user.username} has left the room`))
             
            //Send room and users information
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
    })

    //Capture chat messages
    socket.on('chatMessage', msg => {

        const user = getUser(socket.id)

        io.to(user.room).emit('message', formatMessage(user.username, msg))
    })
})

//Server
server.listen(port, () => {
    console.log(`server listening in port ${port}`);
})