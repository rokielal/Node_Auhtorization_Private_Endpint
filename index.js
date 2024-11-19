const http = require("http");
// const bycript = require("bcrypt");

const app = require("./app.js");

const server = http.createServer(app);

server.on("listening", () => {
  console.log("Listening at port 8080");
});

server.listen(8080);
