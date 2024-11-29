const http = require("http");
// const bycript = require("bcrypt");

const app = require("./app.js");
const PORT = 7000;

const server = http.createServer(app);

server.on("listening", () => {
  console.log(`Listening at port ${PORT}`);
});

server.listen(PORT);
