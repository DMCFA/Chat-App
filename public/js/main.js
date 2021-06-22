//Global variables
const socket = io()
const form = document.getElementById('chat-form')

//Catch Messages
socket.on('message', message => {
    outputMessage(message);
})

//Submit messages
form.addEventListener('submit', (e) => {
    e.preventDefault()

    //Capture message text
    const msg = e.target.elements.message.value
    
    //Send message to server
    socket.emit('chatMessage', msg)
})

//Send message to the DOM
const outputMessage = (message) => {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">Mary <span>9:15pm</span></p>
    <p class="text">
        ${message}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}