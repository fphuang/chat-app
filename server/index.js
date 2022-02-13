const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const router = require('./router');
const { isPromise } = require('util/types');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods:["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

io.on('connection', socket => {
    console.log('We have a new connection!');
    socket.on('disconnect', () => {
        console.log('User had left!');
    });
})

// var corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
//   }
//   app.use(cors(corsOptions));

app.use(router);

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
});