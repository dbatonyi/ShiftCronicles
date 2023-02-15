const http = require("http");
const socketio = require("socket.io");
const jwt = require("jsonwebtoken");
const authenticate = require("./auth/authToken");

const server = http.createServer();
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use((socket, next) => {
  const token = socket.handshake.query.token;

  jwt.verify(token, "mysecretkey", (err, decoded) => {
    if (err) {
      return next(new Error("Invalid token"));
    }

    socket.userId = decoded.id;

    next();
  });
});

io.on("connection", (socket) => {
  console.log(`User ${socket.userId} connected`);

  socket.on("disconnect", () => {
    console.log(`User ${socket.userId} disconnected`);
  });
});

module.exports = server;
