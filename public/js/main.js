//Global variables
const socket = io()
const form = document.getElementById('chat-form')

//Catch Messages
socket.on('message', message => {
    console.log(message);
})

//Submit messages
form.addEventListener('submit', (e) => {
    e.preventDefault()

    //Capture message text
    const msg = e.target.elements.message.value
    
    //Send message to server
    socket.emit('chatMessage', msg)
})