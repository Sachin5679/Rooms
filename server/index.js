const express = require('express');
const app = express();
const http = require('http');
const cors = require("cors");
const { Server } = require('socket.io')

app.use(cors());

app.use("/", (req, res) => {
    res.send("Server is running");
})
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://chatrooms-client-jfs6z0ryt-sachin5679.vercel.app",
        methods: ["GET", "POST"], 
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with id ${socket.id} joined room ${data}`);
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recieve_message", data)
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});



server.listen(3001, () => {
    console.log("Server running on port 3001");
});

