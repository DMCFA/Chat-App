//Global variables
const socket = io()
const form = document.getElementById('chat-form')
const messages = document.querySelector('.chat-messages')

//Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

//Catch Messages
socket.on('message', message => {
    outputMessage(message)

    //Scroll to bottom
    messages.scrollTop = messages.scrollHeight
})

//Submit messages
form.addEventListener('submit', (e) => {
    e.preventDefault()

    //Capture message text
    const msg = e.target.elements.message.value
    
    //Send message to server
    socket.emit('chatMessage', msg)

    //Clear input & focus
    e.target.elements.message.value = ''
    e.target.elements.message.focus()
})

//Send message to the DOM function
const outputMessage = (message) => {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}