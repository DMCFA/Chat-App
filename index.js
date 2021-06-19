//Global variables
require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server);
const port = process.env.PORT

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    })
})

//Server
server.listen(port, () => {
    console.log(`server listening in port ${port}`);
})