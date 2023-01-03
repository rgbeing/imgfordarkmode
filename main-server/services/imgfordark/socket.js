require('dotenv').config()

const { io } = require("socket.io-client");
const socket = io("http://" +  process.env.SERVER_HOST + ":" + process.env.SERVER_PORT).connect();

socket.on("connect", () => {
  console.log("Socket connected: " + socket.id);
});

exports.socket = socket;