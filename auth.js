const jwt = require("jsonwebtoken");

// have async with authorization logic

async function auth(req, res, next) {
  try {
    // get the token from auhtorization header
    // console.log("headers", req.headers);
    // Now we will convert the token into array
    // console.log("headers", req.headers.authorization.split(" ")); // here token will be converted into array index 0 will be Bearer and index 1 will be the token, we need token only

    const token = await req.headers.authorization.split(" ")[1];

    // check if token matches with origin
    const decodedToken = jwt.verify(token, "RANDOM-TOKEN");
    console.log("decodedToken", decodedToken);

    // pass this user down to the protected endpoints
    const user = decodedToken;

    // pass down the next functionality
    next();
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid Request"),
    });
  }
}

module.exports = auth;
