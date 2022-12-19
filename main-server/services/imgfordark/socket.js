const { io } = require("socket.io-client");
const socket = io("http://127.0.0.1:5505").connect();

socket.on("connect", () => {
  console.log("Socket connected: " + socket.id);
});

exports.socket = socket;