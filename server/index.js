const http = require("http");
const { WebSocketServer } = require("ws");
const url = require("url");
const { v4: uuidv4 } = require("uuid");

const port = 5000;

const server = http.createServer();

const wsServer = new WebSocketServer({ server });

wsServer.on("connection", (connection, request) => {
  const { username } = url.parse(request.url, true).query;

  const uuid = uuidv4();
  console.log(username);
  console.log(uuid);
});

server.listen(port, () => {
  console.log("Server Running Happily at", port);
});
