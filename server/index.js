const http = require("http");
const { WebSocketServer } = require("ws");

const port = 5000;

const server = http.createServer();

const wsServer = new WebSocketServer({ server });

server.listen(port, () => {
  console.log("Server Running Happily at ", port);
});
