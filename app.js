const express = require("express");
const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const app = express();

const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");

console.log("User", User);
dbConnect();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "This is server response",
  });
});
// register endpoint

app.post("/register", (req, res) => {
  console.log("req.body: ", req.body);

  // Hasing password using hash+slat technique
  bycript
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      console.log("Hased Password: ", hashedPassword);

      // Create a new user
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
      });

      // Saver user to db
      user
        .save()
        // here we are returning success if the new user is added to the database
        .then((result) => {
          const { email, _id } = result;
          res.status(201).send({
            message: "User created successfully",
            // result, // here we will get email,id and password so we need to send only email and id so we have to destructure them
            result: {
              email: email,
              _id: _id,
            },
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Error creating the user",
            error,
          });
        });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Password was not hashed successfully",
        error,
      });
    });
});

// login endpoint
app.post("/login", (req, res) => {
  // Check if email that user enter on login exists or not
  User.findOne({ email: req.body.email })
    .then((user) => {
      // console.log(user);
      if (!user) {
        res.status(404).send({
          message: "Email not found",
        });
        return;
      }
      bycript
        .compare(req.body.password, user.password)
        .then((checkedPassword) => {
          console.log(checkedPassword);
          if (!checkedPassword) {
            return res.status(400).send({
              message: "Password do not match",
            });
          }

          // Create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          res.status(200).send({
            message: "User Login Successfully",
            email: user.email,
            token,
          });
        })
        .catch((error) => {
          res.status(400).send({
            message: "Password do not match",
            error,
          });
        });
    })
    .catch((error) => {
      res.status(404).send({
        message: "Email not found",
        error,
      });
    });
});

// public end point
app.get("/public-endpoint", (req, res) => {
  res.json({
    message: "You are free to access this anytime",
  });
});

// private end-point
// auth here is middleware
app.get("/private-endpoint", auth, (req, res) => {
  res.json({
    message: "You need authentication to access it",
  });
});

// private end-point to show order page once the user is loggin
app.get("/orders", auth, (req, res) => {
  res.json({
    message: "Your Orders are ready to access",
  });
});
module.exports = app;
