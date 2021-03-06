//Global variables
const socket = io()
const form = document.getElementById('chat-form')
const messages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userNames = document.getElementById('users')

//Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

socket.emit('joinedRoom', { username, room })

//Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room)
    outputUserNames(users)
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

//Send room name to the DOM
const outputRoomName = room => {
    roomName.innerText = room
}

//Send user names to the DOM
const outputUserNames = users => {
    userNames.innerHTML = 
        `${users.map(user => `<li>${user.username}</li>`).join('')}`
}