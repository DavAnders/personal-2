const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

const PORT = process.env.PORT || 3000
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
})
