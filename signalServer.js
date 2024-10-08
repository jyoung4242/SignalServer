// signalingServer.js
const WebSocket = require("ws");

// Create WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  console.log("A new client connected.");

  // Listen for messages from clients
  ws.on("message", function message(data) {
    console.log("Received message:", data);

    // Broadcast the received message to all connected clients except the sender
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log("Sending message to client:", data);
        client.send(data);
      }
    });
  });

  // Handle connection close event
  ws.on("close", () => {
    console.log("A client disconnected.");
  });
});

console.log("Signaling server is running on ws://localhost:8080");

const https = require("https");

https.get("https://ifconfig.me", res => {
  let ip = "";
  res.on("data", chunk => {
    ip += chunk;
  });
  res.on("end", () => {
    console.log("External IP address:", ip);
  });
});
