const app = require("./app")
const { PORT, CLIENT_URL } = require("./config")

// connect db
require("./config/db")

const server = app.listen(PORT, () => {
  console.log(`[+] Server is running on port ${PORT}`)
})



const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: CLIENT_URL
  }
})


io.on('connection', (socket) => {
  console.log(`Connected to socket.io`)

  socket.on('setup', (userData) => {
    socket.join(userData._id)
    socket.emit('connected')
  })

  socket.on('join chat', (room) => {
    socket.join(room)
    console.log(`User joined room ${room}`)
  })

  socket.on('typing', (room) => socket.in(room).emit('typing'))
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'))

  socket.on('new message', (msg) => {
    var chat = msg.chat

    if (!chat.users) return console.log('chat.users not defined')

    chat.users.forEach((user) => {
      if (user._id == msg.sender._id) return

      socket.in(user._id).emit('message received', msg)
    })
  })

  socket.off('setup', () => {
    console.log('user disconnected')
    socket.leave(userData._id)
  })
})