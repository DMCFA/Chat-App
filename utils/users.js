const users = []

//Join user
const joinUser = (id, username, room) => {
    const user = { id, username, room }

    users.push(user)

    return user
}

//User leaves

const userLeaving = id => {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

//Get current user
const getUser = id => {
    return users.find(user => user.id === id)
}

//Get room users

const getRoomUsers = room => {
    return users.filter(user => user.room === room)
}

module.exports = {
    joinUser,
    userLeaving,
    getUser,
    getRoomUsers
}