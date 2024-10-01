const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

// Use CORS middleware
app.use(cors({
    origin: "https://rooms-yv5v.onrender.com/", // Allowed origin for development
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials if needed
}));

// Simple route to check server status
app.get("/", (req, res) => {
    res.send("Server is running");
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://rooms-yv5v.onrender.com/", // Allowed origin for socket.io
        methods: ["GET", "POST"],
        credentials: true,
    },
    allowEIO3: true,
});

// Middleware for socket.io
io.use((socket, next) => {
    const origin = socket.handshake.headers.origin;

    // Allow connections only from the specified origin
    if (origin === "https://rooms-yv5v.onrender.com/") {
        return next();
    }

    // Otherwise, reject the connection
    return next(new Error('Unauthorized origin'));
});

// Socket.io connection logic
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with id ${socket.id} joined room ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recieve_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

// Start the server
server.listen(3001, () => {
    console.log("Server running on port 3001");
});
