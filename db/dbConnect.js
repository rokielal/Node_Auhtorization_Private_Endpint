require("dotenv").config();
const mongoose = require("mongoose");

async function dbConnect() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(
        "Successfully connected to mongoDb Atlas using Nodemon is fun"
      );
    })
    .catch((err) => {
      console.log("Unable to connect mongoDB");
      console.error(err);
    });
}

module.exports = dbConnect;
