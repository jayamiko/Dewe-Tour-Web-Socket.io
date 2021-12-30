require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import Server and http
const http = require("http");
const {server} = require("socket.io");

const router = require("./src/routes/index");
const app = express();
const PORT = 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000" // we must define cors because our client and server have different origin. and dont use / in back
    origin: "http://localhost:30000",
  },
});

// import socket function and call with parameter io
require('./src/socket')(io)

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use("/api/v1/", router);

server.listen(PORT, () => {
  console.log(("Server Running on Port: ", PORT));
});
