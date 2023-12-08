const http = require("http");
const { WebSocketServer } = require("ws");
const url = require("url");
const { v4: uuidv4 } = require("uuid");

const port = 5000;

const server = http.createServer((req, res) => {
  res.write("Server Running Happily!");
  res.end();
});

const wsServer = new WebSocketServer({ server });

const connections = {};
const users = {};

const broadcast = () => {
  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid];
    const message = JSON.stringify(users);
    connection.send(message);
  });
};

const handleMessage = (message, uuid) => {
  const parsedMessage = JSON.parse(message.toString());

  const user = users[uuid];
  user["state"] = parsedMessage;

  broadcast();

  console.log(
    `${user.username} updated their state: ${JSON.stringify(user.state)}`
  );

  //   console.log(parsedMessage);
};

const handleClose = (uuid) => {
  delete connections[uuid];
  delete users[uuid];

  broadcast();
};

wsServer.on("connection", (connection, request) => {
  const { username } = url.parse(request.url, true).query;

  const uuid = uuidv4();

  connections[uuid] = connection;

  users[uuid] = {
    username,
    state: {},
  };

  connection.on("message", (message) => handleMessage(message, uuid));
  connection.on("close", () => handleClose(uuid));
});

server.listen(port, () => {
  console.log("Server Running Happily at", port);
});
