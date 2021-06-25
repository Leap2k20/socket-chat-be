const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3001",
    }
});


io.on('connection', (socket) => {
    console.log('Connected from client');

    socket.on('message', (data) => {
        socket.broadcast.emit('message', data)
    })

    socket.on('typing', () => {
        socket.broadcast.emit('server-typing')
    })

    socket.on('typing-end', () => {
        socket.broadcast.emit('server-typing-end')
    })
})



server.listen(3000, () => {
  console.log('listening on *:3000');
});
